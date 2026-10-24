import json
import logging
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from .models import CarMake, CarModel
from .populate import initiate
from .restapis import get_request, analyze_review_sentiments, post_review

logger = logging.getLogger(__name__)


def _json_body(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except (ValueError, UnicodeDecodeError):
        return None


@csrf_exempt
@require_POST
def login_user(request):
    data = _json_body(request)
    if data is None:
        return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)
    username = data.get("userName") or data.get("username", "")
    password = data.get("password", "")
    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({"status": "error", "message": "Invalid username or password"}, status=401)
    login(request, user)
    return JsonResponse({"userName": user.username, "status": "Authenticated"})


@csrf_exempt
@require_POST
def logout_request(request):
    logout(request)
    return JsonResponse({"userName": "", "status": "Logged out"})


@csrf_exempt
@require_POST
def registration(request):
    data = _json_body(request)
    if data is None:
        return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)
    username = (data.get("userName") or data.get("username") or "").strip()
    password = data.get("password") or ""
    first_name = (data.get("firstName") or data.get("first_name") or "").strip()
    last_name = (data.get("lastName") or data.get("last_name") or "").strip()
    email = (data.get("email") or "").strip()
    if not all([username, password, first_name, last_name, email]):
        return JsonResponse({"status": "error", "message": "All five fields are required"}, status=400)
    if User.objects.filter(username=username).exists():
        return JsonResponse({"userName": username, "error": "Already Registered"}, status=409)
    user = User.objects.create_user(
        username=username, password=password, first_name=first_name,
        last_name=last_name, email=email,
    )
    login(request, user)
    return JsonResponse({"userName": user.username, "status": "Authenticated"}, status=201)


@require_GET
def get_cars(request):
    if not CarMake.objects.exists():
        initiate()
    cars = [
        {"CarModel": item.name, "CarMake": item.car_make.name,
         "Year": item.year, "Type": item.type, "Color": item.color}
        for item in CarModel.objects.select_related("car_make").all()
    ]
    return JsonResponse({"CarModels": cars})


@require_GET
def get_dealerships(request, state="All"):
    endpoint = "/fetchDealers" if not state or state.lower() == "all" else f"/fetchDealers/{state}"
    result = get_request(endpoint)
    if isinstance(result, dict) and result.get("error"):
        return JsonResponse({"status": 503, "message": result["error"], "dealers": []}, status=503)
    return JsonResponse({"status": 200, "dealers": result if isinstance(result, list) else []})


@require_GET
def get_dealer_details(request, dealer_id):
    result = get_request(f"/fetchDealer/{dealer_id}")
    if isinstance(result, dict) and result.get("error"):
        return JsonResponse({"status": 503, "message": result["error"]}, status=503)
    return JsonResponse({"status": 200, "dealer": result})


@require_GET
def get_dealer_reviews(request, dealer_id):
    result = get_request(f"/fetchReviews/dealer/{dealer_id}")
    if isinstance(result, dict) and result.get("error"):
        return JsonResponse({"status": 503, "message": result["error"], "reviews": []}, status=503)
    reviews = result if isinstance(result, list) else []
    for item in reviews:
        sentiment = analyze_review_sentiments(item.get("review", ""))
        item["sentiment"] = sentiment.get("sentiment", "neutral")
    return JsonResponse({"status": 200, "reviews": reviews})


@csrf_exempt
@require_POST
def add_review(request):
    if not request.user.is_authenticated:
        return JsonResponse({"status": 403, "message": "Login is required to post a review"}, status=403)
    data = _json_body(request)
    if data is None:
        return JsonResponse({"status": 400, "message": "Invalid JSON"}, status=400)
    data.setdefault("name", request.user.get_full_name() or request.user.username)
    data.setdefault("username", request.user.username)
    try:
        result = post_review(data)
        return JsonResponse({"status": 201, "response": result}, status=201)
    except Exception as exc:
        logger.exception("Could not post review")
        return JsonResponse({"status": 503, "message": "Review service unavailable", "detail": str(exc)}, status=503)


@require_GET
def health(request):
    return JsonResponse({"status": "ok"})
