# Capstone evidence checklist

This checklist follows the attached 28-task rubric. The root-level API evidence files below were captured by real curl commands against services running during a successful GitHub Actions integration test. The CI workflow also runs Python, Node, React, and Django checks.

## Source links

- Project README: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/README.md
- About Us: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/static/About.html
- Contact Us: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/static/Contact.html
- Register component (Username, First Name, Last Name, Email, Password): https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/src/components/Register/Register.jsx
- CI workflow: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/.github/workflows/ci.yml
- Local browser screenshot automation: https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/scripts/capture-ui-screenshots.js

## Live API and server output files in repository root

- django_server: actual Django development-server console output plus a successful health response.
- loginuser, logoutuser: actual responses to login/logout curl operations with a temporary CI test account; its password is not written to the file.
- getdealerreviews: reviews for dealer ID 2 (seeded reviews are available).
- getalldealers: all dealers returned by the Express/Mongo API.
- getdealerbyid: details for dealer ID 2.
- getdealersbyState: dealers filtered to Kansas.
- getallcarmakes: Django response containing seeded car makes/models.
- analyzereview: live sentiment endpoint response for “Fantastic services”.
- CICD: captured output from a successful GitHub Actions job. The latest run list is available at https://github.com/kumar1419alt/coursea/actions.

These outputs were captured from a temporary integration-test runtime in GitHub Actions. They are genuine runtime output, but they are not evidence of a deployed IBM Cloud application.

## Screenshots

The workflow is configured to capture actual headed-browser screenshots from the same local CI runtime:
- admin_login.png, admin_logout.png
- get_dealers.png, get_dealers_loggedin.png
- dealersbystate.png, dealer_id_reviews.png
- dealership_review_submission.png, added_review.png

Those screenshots show the local test URL in the browser chrome. They must not be described as screenshots of the IBM-hosted deployment.

## Still pending: actual cloud deployment

The IBM Cloud CLI login was successful, but the logged-in IBM ID returned “No account is found”, and the lab-provided API-key login failed. Therefore, no Kubernetes/IBM Cloud resources have been created from this session.

- deploymentURL: must contain the actual reachable service URL after the course-provided IBM account/cluster becomes available.
- deployed_landingpage.png, deployed_loggedin.png, deployed_dealer_detail.png, deployed_add_review.png: must be captured from the genuinely deployed app with its real URL visible.
- Do not submit a placeholder as the deployment URL.
