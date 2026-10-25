#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

BASE_URL="${BASE_URL:-http://127.0.0.1:8000}"
DEALER_API_URL="${DEALER_API_URL:-http://127.0.0.1:3030}"
SENTIMENT_URL="${SENTIMENT_URL:-http://127.0.0.1:5050}"
DEALER_ID="${DEALER_ID:-2}"
COOKIE_JAR="${TMPDIR:-/tmp}/bestcars-evidence-cookies.txt"

capture() {
  local file="$1"
  local command_display="$2"
  local url="$3"
  {
    printf '$ %s\n\n' "$command_display"
    curl --fail --silent --show-error "$url" | python -m json.tool
    printf '\n'
  } > "$ROOT_DIR/$file"
  printf 'Captured %s\n' "$file"
}

capture getdealerreviews \
  "curl -fsS '$DEALER_API_URL/fetchReviews/dealer/$DEALER_ID' | python -m json.tool" \
  "$DEALER_API_URL/fetchReviews/dealer/$DEALER_ID"

capture getalldealers \
  "curl -fsS '$DEALER_API_URL/fetchDealers' | python -m json.tool" \
  "$DEALER_API_URL/fetchDealers"

capture getdealerbyid \
  "curl -fsS '$DEALER_API_URL/fetchDealer/$DEALER_ID' | python -m json.tool" \
  "$DEALER_API_URL/fetchDealer/$DEALER_ID"

capture getdealersbyState \
  "curl -fsS '$DEALER_API_URL/fetchDealers/Kansas' | python -m json.tool" \
  "$DEALER_API_URL/fetchDealers/Kansas"

capture getallcarmakes \
  "curl -fsS '$BASE_URL/djangoapp/get_cars' | python -m json.tool" \
  "$BASE_URL/djangoapp/get_cars"

capture analyzereview \
  "curl -fsS '$SENTIMENT_URL/analyze/Fantastic%20services' | python -m json.tool" \
  "$SENTIMENT_URL/analyze/Fantastic%20services"

if [[ -n "${DEMO_USERNAME:-}" && -n "${DEMO_PASSWORD:-}" ]]; then
  body="$(DEMO_USERNAME="$DEMO_USERNAME" DEMO_PASSWORD="$DEMO_PASSWORD" python -c 'import json,os; print(json.dumps({"userName":os.environ["DEMO_USERNAME"],"password":os.environ["DEMO_PASSWORD"]}))')"

  login_command="$(cat <<LOGIN_COMMAND
curl -X POST -c "$COOKIE_JAR" -H "Content-Type: application/json" --data-raw '{"userName":"$DEMO_USERNAME","password":"$DEMO_PASSWORD"}' "$BASE_URL/djangoapp/login"
LOGIN_COMMAND
)"
  {
    printf '$ %s\n\n' "$login_command"
    curl --fail --silent --show-error -X POST -c "$COOKIE_JAR" -H "Content-Type: application/json" --data-raw "$body" "$BASE_URL/djangoapp/login" | python -m json.tool
    printf '\n'
  } > "$ROOT_DIR/loginuser"
  printf 'Captured loginuser\n'

  logout_command="$(cat <<LOGOUT_COMMAND
curl -X GET -b "$COOKIE_JAR" "$BASE_URL/djangoapp/logout"
LOGOUT_COMMAND
)"
  {
    printf '$ %s\n\n' "$logout_command"
    curl --fail --silent --show-error -X GET -b "$COOKIE_JAR" "$BASE_URL/djangoapp/logout" | python -m json.tool
    printf '\n'
  } > "$ROOT_DIR/logoutuser"
  rm -f "$COOKIE_JAR"
  printf 'Captured logoutuser\n'
else
  echo "Login evidence skipped: set DEMO_USERNAME and DEMO_PASSWORD to a test account. These variables are not written to evidence."
fi

echo "API evidence files are live responses from the configured services."
