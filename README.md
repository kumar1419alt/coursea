# Best Cars — Full-Stack Dealership Capstone

## Required project metadata

**Repository name:** `coursea`  
**Project name:** Best Cars — Car Dealership and Customer Review Platform

This branch contains the Django + React car-dealership capstone project. Use this branch when working on the capstone; the repository's default branch has not been changed.

## What is included

- Django user registration, login/logout, car make/model models and Django admin
- React registration (all five required fields), login, dealer list/state filtering, dealer details/reviews, and post-review forms
- Express + MongoDB dealer/review API with seed data
- Flask sentiment-analysis endpoint for development
- Dockerfiles, Docker Compose, GitHub Actions CI, and an evidence-capture script
- Updated About Us and Contact Us pages with valid CSS paths, active navigation states, staff profiles, images, and contact details

## Start locally

    cd server
    docker compose up --build

Open http://localhost:8000. See server/README.md for service endpoints and development alternatives.

## Important: submission evidence

Only code and CI checks can be prepared in Git without running the user's lab. Actual cURL response files must be generated against running services. The Django server log, authenticated admin screenshots, browser screenshots, IBM deployment URL, and successful deployment evidence must be captured from the real lab/cloud session. They are not fabricated or represented as complete here.

Run scripts/capture-api-evidence.sh from the repository root after starting the services. See submission-evidence.md for the file checklist.
