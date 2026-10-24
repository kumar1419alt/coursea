# Best Cars Capstone — Answers for Tasks 1–28

Branch: https://github.com/kumar1419alt/coursea/tree/django-dealership-capstone

> The code, live cURL evidence, successful CI output, and local-runtime screenshots are committed to this branch. The application has NOT been deployed to IBM Cloud because the course IBM account was unavailable from this session. Tasks 24–28 that require a genuine IBM deployment therefore remain pending; no fictitious URL is supplied.

## Task 1 — README URL (1 point)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/README.md

## Task 2 — Django server terminal output (1 point)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/django_server

The saved output shows Django 5.2.18 starting at http://0.0.0.0:8000/, with the system check passing and a successful /djangoapp/health response. This is a real test-runtime log.

## Task 3 — About Us page source (3 points)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/static/About.html

## Task 4 — Contact Us page source (2 points)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/static/Contact.html

## Task 5 — Login cURL command and output (2 points)

File: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/loginuser

The captured output is:

    {
        "userName": "capstone-demo",
        "status": "Authenticated"
    }

The test account password is generated temporarily by CI and is not stored in the repository.

## Task 6 — Logout cURL command and output (2 points)

File: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/logoutuser

The captured output is:

    {
        "userName": "",
        "status": "Logged out"
    }

## Task 7 — Sign-up page source (1 point)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/src/components/Register/Register.jsx

This form contains Username, First Name, Last Name, Email, Password, and a Register button.

## Task 8 — Dealer reviews (2 points)

File: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/getdealerreviews

Command recorded in the file:

    curl -fsS 'http://127.0.0.1:3030/fetchReviews/dealer/2' | python -m json.tool

Dealer ID 2 was selected because it has seeded reviews.

## Task 9 — All dealers (2 points)

File: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/getalldealers

Command recorded in the file:

    curl -fsS 'http://127.0.0.1:3030/fetchDealers' | python -m json.tool

## Task 10 — One dealer’s details (2 points)

File: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/getdealerbyid

Command recorded in the file:

    curl -fsS 'http://127.0.0.1:3030/fetchDealer/2' | python -m json.tool

## Task 11 — Dealers in Kansas (2 points)

File: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/getdealersbyState

Command recorded in the file:

    curl -fsS 'http://127.0.0.1:3030/fetchDealers/Kansas' | python -m json.tool

## Task 12 — Admin root login screenshot (2 points)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/admin_login.png

This screenshot was captured from the local CI test runtime, not an IBM deployment.

## Task 13 — Admin root logout screenshot (1 point)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/admin_logout.png

This screenshot was captured from the local CI test runtime, not an IBM deployment.

## Tasks 14 and 15 — Car makes and models (4 points)

File: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/getallcarmakes

Command recorded in the file:

    curl -fsS 'http://127.0.0.1:8000/djangoapp/get_cars' | python -m json.tool

The JSON contains the populated CarModels list, including CarModel, CarMake, Year, Type, and Color fields.

## Task 16 — Sentiment analysis for “Fantastic services” (2 points)

File: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/analyzereview

Command recorded in the file:

    curl -fsS 'http://127.0.0.1:5050/analyze/Fantastic%20services' | python -m json.tool

Captured response:

    {
        "negative_terms": 0,
        "positive_terms": 1,
        "score": 1,
        "sentiment": "positive",
        "text": "Fantastic services"
    }

This is from the test sentiment service, not a deployed IBM URL.

## Task 17 — Home page before login (1 point)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/get_dealers.png

## Task 18 — Home page after login (2 points)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/get_dealers_loggedin.png

The screenshot shows the logged-in test username and Review Dealer option.

## Task 19 — Dealers filtered by state (2 points)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/dealersbystate.png

The screenshot shows the homepage filtered to Kansas.

## Task 20 — Dealer details with reviews (1 point)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/dealer_id_reviews.png

The selected dealer is ID 2, which has seeded reviews.

## Task 21 — Review form before submission (1 point)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/dealership_review_submission.png

The form was populated with a Toyota Camry review dated 2026-10-24.

## Task 22 — Review after submission (2 points)

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/added_review.png

The screenshot shows the submitted review in the dealer page. Both Tasks 21 and 22 screenshots are from the local CI test runtime.

## Task 23 — Successful CI/CD output (3 points)

Output file: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/CICD

Successful workflow run: https://github.com/kumar1419alt/coursea/actions/runs/40143109536

The workflow passed Python compilation and sentiment tests, Node.js and JSON checks, the React production build, Django checks, runtime integration tests, and evidence capture/commit.

## Task 24 — Deployment URL (1 point)

Pending — no genuine IBM deployment URL is available. The logged-in IBM ID returned “No account is found”, and the lab-provided API key did not authenticate. Do not submit localhost or an invented URL as an IBM deployment.

## Task 25 — Deployed landing-page screenshot (2 points)

Pending until the app is deployed to IBM Cloud and a screenshot with the actual deployment URL is captured.

## Task 26 — Deployed logged-in screenshot (2 points)

Pending until the app is deployed to IBM Cloud and a screenshot with the actual URL and logged-in username is captured.

## Task 27 — Deployed dealer-details screenshot (2 points)

Pending until a dealer-details page is opened through the actual IBM deployment URL and captured.

## Task 28 — Deployed review screenshot (2 points)

Pending until the submitted review is shown through the actual IBM deployment URL and captured.

## Project branch and setup

Repository branch: https://github.com/kumar1419alt/coursea/tree/django-dealership-capstone

Run instructions and Docker Compose/Kubernetes manifests are in:

https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/README.md

Important: this is a dedicated branch in the existing coursea repository; it is not a newly created fork. If the grader specifically requires a fork, create/use the required fork URL before submitting.
