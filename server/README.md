# Best Cars application setup

## Architecture

- Django (server/manage.py): registration, login/logout, car make/model admin, and proxy endpoints.
- React (server/frontend): dealership list, filter-by-state, dealer details/reviews, registration, login, and post-review screens.
- Express + MongoDB (server/database): dealer/review API seeded from JSON data on first startup.
- Flask sentiment microservice (server/djangoapp/microservices): /analyze/<text> endpoint. The bundled local analyzer is intentionally lightweight; a course-provisioned IBM Watson sentiment endpoint can be configured with SENTIMENT_ANALYZER_URL.

## Run the complete app with Docker Compose

From the repository root:

    cd server
    docker compose up --build

Open http://localhost:8000. The Django administration site is at http://localhost:8000/admin/; create an administrator using:

    docker compose exec web python manage.py createsuperuser

API endpoints:
- GET http://localhost:8000/djangoapp/get_cars
- GET http://localhost:8000/djangoapp/get_dealers
- GET http://localhost:8000/djangoapp/get_dealers/Kansas
- GET http://localhost:8000/djangoapp/dealer/1
- GET http://localhost:8000/djangoapp/reviews/dealer/1
- POST http://localhost:8000/djangoapp/login
- POST http://localhost:8000/djangoapp/logout
- POST http://localhost:8000/djangoapp/register
- POST http://localhost:8000/djangoapp/add_review
- GET http://localhost:3030/fetchDealers
- GET http://localhost:3030/fetchReviews/dealer/1
- GET http://localhost:5050/analyze/Fantastic%20services

## Submission evidence

The repository includes scripts/capture-api-evidence.sh, which records live API responses when services are running. It does not manufacture browser screenshots, deployment URLs, login results, or successful CI output. Capture those artifacts from the actual lab/cloud session after deployment.
