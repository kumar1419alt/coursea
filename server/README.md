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
- GET http://localhost:8000/djangoapp/dealer/2
- GET http://localhost:8000/djangoapp/reviews/dealer/2
- POST http://localhost:8000/djangoapp/login
- POST http://localhost:8000/djangoapp/logout
- POST http://localhost:8000/djangoapp/register
- POST http://localhost:8000/djangoapp/add_review
- GET http://localhost:3030/fetchDealers
- GET http://localhost:3030/fetchReviews/dealer/2
- GET http://localhost:5050/analyze/Fantastic%20services

## Submission evidence

The repository includes scripts/capture-api-evidence.sh, which records live API responses when services are running. It does not manufacture browser screenshots, deployment URLs, login results, or successful CI output. Capture those artifacts from the actual lab/cloud session after deployment.


## Kubernetes deployment notes

A starter manifest is provided at server/deployment.yaml. Before applying it:

1. Build and push three images to IBM Container Registry using your own namespace: bestcars-web (build with server/Dockerfile), bestcars-dealer-api (build with server/database/Dockerfile), and bestcars-sentiment (build with server/djangoapp/microservices/Dockerfile).
2. Replace every REPLACE_WITH_ICR_NAMESPACE in the manifest with the namespace you actually own.
3. Create a strong Django secret in the target cluster:
   
       kubectl create secret generic bestcars-secret --from-literal=DJANGO_SECRET_KEY="$(python -c 'import secrets; print(secrets.token_urlsafe(50))')"

4. Apply the manifest and wait for the LoadBalancer service to receive an external IP:

       kubectl apply -f server/deployment.yaml
       kubectl get pods
       kubectl get svc bestcars-web

5. Use the actual external address printed by the service as the deploymentURL. Capture the deployed screenshots only after you can visit that address successfully.

These are deployment instructions and manifests only. They do not create cloud resources by themselves and have not been applied to an IBM cluster from this repository integration.
