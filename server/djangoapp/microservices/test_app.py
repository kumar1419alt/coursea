import unittest
from app import app, classify


class SentimentTests(unittest.TestCase):
    def test_positive_review(self):
        self.assertEqual(classify("Fantastic services")["sentiment"], "positive")

    def test_negative_review(self):
        self.assertEqual(classify("terrible and rude service")["sentiment"], "negative")

    def test_neutral_review(self):
        self.assertEqual(classify("the vehicle arrived on Tuesday")["sentiment"], "neutral")

    def test_http_endpoint(self):
        response = app.test_client().get("/analyze/Fantastic%20services")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["sentiment"], "positive")


if __name__ == "__main__":
    unittest.main()
