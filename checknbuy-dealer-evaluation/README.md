# CheckNBuy — Dealer Evaluation

This directory contains the IBM Developer Skills Network CheckNBuy starter app, organized for deployment to IBM Cloud Code Engine.

## Components
- `backend/products_list/`: Python/Flask API, expected port 5000.
- `backend/dealer_details/`: Node.js/Express API, expected port 8080.
- `frontend/`: Python/Flask UI, expected port 5001.

## Deploy order
1. Deploy `backend/products_list/` to Code Engine; note its assigned HTTPS URL.
2. Deploy `backend/dealer_details/` to Code Engine; note its assigned HTTPS URL.
3. Edit `frontend/html/index.html`: set `produrl` to the Products List HTTPS URL plus trailing `/`, and `dealerurl` to the Dealer Details HTTPS URL plus trailing `/`.
4. Rebuild/redeploy the `frontend/` application after updating those two URLs.
5. Test selecting a product, then a dealer, and finally **All Dealers**.

## API endpoints
- Products List: `GET /products`, `GET /getdealers/<product>`
- Dealer Details: `GET /price/<dealer>/<product>`, `GET /allprice/<product>`

## Deployment status
The code is staged; Code Engine URLs have **not** been generated yet. The frontend currently has clearly marked URL placeholders rather than fake/live-looking values. Authentication to the course's IBM Cloud account is still required to create and verify the apps.

## Upstream source
- https://github.com/ibm-developer-skills-network/dealer_evaluation_backend
- https://github.com/ibm-developer-skills-network/dealer_evaluation_frontend

The upstream license will be preserved with the project.
