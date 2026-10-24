# Capstone evidence checklist

This checklist follows the attached 28-task rubric. Evidence files should contain outputs/screenshots captured by running the application, not hand-written or fabricated results.

## Source links (this branch)

- Project README: README.md
- Django configuration and server code: server/
- About Us: server/frontend/static/About.html
- Contact Us: server/frontend/static/Contact.html
- Register form with Username, First Name, Last Name, Email, Password: server/frontend/src/components/Register/Register.jsx
- CI workflow definition: .github/workflows/ci.yml

## API command/output files

After starting all services, run scripts/capture-api-evidence.sh from the repository root. It generates live responses for:
- getdealerreviews
- getalldealers
- getdealerbyid
- getdealersbyState (Kansas)
- getallcarmakes
- analyzereview (review text: “Fantastic services”)

To generate loginuser/logoutuser too, first create a test user, then set DEMO_USERNAME and DEMO_PASSWORD in your shell before running the script. The script does not print or save the password itself.

## Still requires a real lab/cloud session

- django_server: capture the actual Django server startup log.
- admin_login.png / admin_logout.png: real browser screenshots of Django admin login and logout.
- get_dealers.png, get_dealers_loggedin.png, dealersbystate.png, dealer_id_reviews.png, dealership_review_submission.png, added_review.png: screenshots of the app with the address bar visible where required.
- CICD: after GitHub Actions completes, copy the actual workflow run/job output into this file in the exact required filename.
- deploymentURL: write the actual IBM/Kubernetes deployment URL once the deployment exists.
- deployed_landingpage.png, deployed_loggedin.png, deployed_dealer_detail.png, deployed_add_review.png: actual browser screenshots of the deployed app with its URL visible.

No deployment URL or browser screenshots have been invented in the repository.
