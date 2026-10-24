import os
from urllib.parse import quote
import requests
from dotenv import load_dotenv

load_dotenv()
BACKEND_URL = os.getenv("BACKEND_URL", os.getenv("backend_url", "http://127.0.0.1:3030")).rstrip("/")
SENTIMENT_URL = os.getenv("SENTIMENT_ANALYZER_URL", os.getenv("sentiment_analyzer_url", "http://127.0.0.1:5050")).rstrip("/")
TIMEOUT_SECONDS = float(os.getenv("SERVICE_TIMEOUT_SECONDS", "4"))


def get_request(endpoint, **params):
    url = f"{BACKEND_URL}/{endpoint.lstrip('/')}"
    try:
        response = requests.get(url, params=params or None, timeout=TIMEOUT_SECONDS)
        response.raise_for_status()
        return response.json()
    except (requests.RequestException, ValueError) as exc:
        return {"error": f"Dealer service unavailable: {exc}", "status": 503}


def analyze_review_sentiments(text):
    try:
        response = requests.get(f"{SENTIMENT_URL}/analyze/{quote(str(text), safe='')}", timeout=TIMEOUT_SECONDS)
        response.raise_for_status()
        return response.json()
    except (requests.RequestException, ValueError):
        return {"sentiment": "neutral", "warning": "Sentiment service is unavailable"}


def post_review(data_dict):
    url = f"{BACKEND_URL}/insertReview"
    response = requests.post(url, json=data_dict, timeout=TIMEOUT_SECONDS)
    response.raise_for_status()
    return response.json()
