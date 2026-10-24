# Submission links — Best Cars dealership capstone

Repository branch: https://github.com/kumar1419alt/coursea/tree/django-dealership-capstone

## Code artifacts

Task 1 — Project README:
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/README.md

Task 3 — About Us page:
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/static/About.html

Task 4 — Contact Us page:
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/static/Contact.html

Task 7 — Register component with all five required input fields:
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/src/components/Register/Register.jsx

## Runtime evidence files

The root of this branch contains the real CICD log and the live curl output files requested by the rubric:
- django_server
- loginuser
- logoutuser
- getdealerreviews
- getalldealers
- getdealerbyid
- getdealersbyState
- getallcarmakes
- analyzereview

The GitHub Actions workflow is configured to generate browser screenshots for local app tasks from a headed browser session, with its real address bar visible:
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/.github/workflows/ci.yml

## Deployment status

The project includes a Kubernetes manifest and Docker Compose instructions, but it has not been deployed to IBM Cloud. IBM Cloud returned “No account is found” for the currently logged-in IBM ID, and its lab API key did not authenticate. Consequently there is no real deployment URL or deployed-app screenshot yet; those artifacts must be captured when the correct course-provided account/cluster is available.
