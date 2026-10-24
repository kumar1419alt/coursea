# Submission links — Best Cars dealership capstone

Repository branch: https://github.com/kumar1419alt/coursea/tree/django-dealership-capstone

## Code artifacts

Task 1 — Project README:
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/README.md

Task 3 — About Us page:
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/static/About.html

Task 4 — Contact Us page:
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/static/Contact.html

Task 7 — Register component (Username, First Name, Last Name, Email, Password and Register button):
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/server/frontend/src/components/Register/Register.jsx

CI workflow definition:
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/.github/workflows/ci.yml

API evidence generation script:
https://github.com/kumar1419alt/coursea/blob/django-dealership-capstone/scripts/capture-api-evidence.sh

## How to create the live API evidence files

1. Start the services using the directions in server/README.md.
2. Create a test account in the app's Register page.
3. From the repository root, export DEMO_USERNAME and DEMO_PASSWORD in your shell.
4. Run bash scripts/capture-api-evidence.sh. It captures the actual JSON responses for dealer reviews, all dealers, one dealer, Kansas dealers, car makes/models, and the sentiment phrase “Fantastic services”. If login credentials are set, it also creates loginuser and logoutuser using a cookie jar.
5. Capture django_server from the real Django server console, and take the rubric-required browser screenshots with the URL/address bar visible.

## Not claimed complete

This branch has code and automated CI validation, but it is not yet deployed to IBM Cloud/Kubernetes. The deploymentURL and deployed_*.png screenshots must be completed from the course's actual cloud/lab account. No live deployment URL, login response, server log, or screenshot has been fabricated.
