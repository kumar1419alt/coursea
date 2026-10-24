import os
from flask import Flask, jsonify

app = Flask(__name__)
PORT = int(os.getenv("PORT", "5050"))

POSITIVE = {
    "amazing", "awesome", "best", "brilliant", "excellent", "fantastic",
    "friendly", "good", "great", "helpful", "love", "perfect", "recommend",
    "smooth", "superb", "wonderful", "professional", "satisfied",
}
NEGATIVE = {
    "awful", "bad", "broken", "disappointing", "hate", "horrible", "poor",
    "rude", "slow", "terrible", "unhelpful", "worst", "angry", "damaged",
}


def classify(text):
    words = [word.strip(".,!?;:()[]{}\"'").lower() for word in text.split()]
    positive = sum(word in POSITIVE for word in words)
    negative = sum(word in NEGATIVE for word in words)
    score = positive - negative
    sentiment = "positive" if score > 0 else "negative" if score < 0 else "neutral"
    return {"sentiment": sentiment, "score": score, "positive_terms": positive, "negative_terms": negative}


@app.get("/")
def index():
    return jsonify({"service": "Best Cars sentiment analyzer", "status": "ok"})


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


@app.get("/analyze/<path:text>")
def analyze(text):
    text = text.strip()
    return jsonify({"text": text, **classify(text)})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
