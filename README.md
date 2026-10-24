# Best Cars — Full-Stack Dealership Capstone

A Django + React application for exploring car dealerships, filtering locations by state, reviewing dealers, and managing car make/model data. An Express API provides dealer/review data, and a sentiment service analyses submitted review text.

## Project structure

- `server/djangoproj/`: Django settings and URL configuration
- `server/djangoapp/`: Django auth, car models, dealer/review proxy endpoints
- `server/database/`: Express dealer/review API and JSON starter data
- `server/frontend/`: React frontend and static About/Contact pages
- `.github/workflows/`: CI checks

## Local setup

See `server/README.md` for the development setup and required services. Runtime evidence and cloud deployment URLs must be collected from a real lab/cloud session; this repository intentionally does not invent server logs, API output, screenshots, or deployment URLs.

## Capstone state

Source code is staged in Git. A real deployment, successful GitHub Actions run, cURL response evidence, and browser screenshots are pending execution in the student's IBM Skills Network environment.

## Attribution

The assignment is based on the IBM Full Stack Software Developer car dealership capstone. See `LICENSE` and comments in adapted starter files for attribution.
