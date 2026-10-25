# Best Cars Capstone — Answers for Tasks 1–28

**Repository name:** `coursea`  
**Project name:** Best Cars — Car Dealership and Customer Review Platform

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

Complete command and output to paste into the assessment:

```text
$ curl -fsS 'http://127.0.0.1:3030/fetchDealers' | python -m json.tool

[
    {
        "_id": "6add419aaf3d238fd0dc3254",
        "id": 1,
        "city": "El Paso",
        "state": "Texas",
        "st": "TX",
        "address": "3 Nova Court",
        "zip": "88563",
        "lat": 31.6948,
        "long": -106.3,
        "short_name": "Holdlamis",
        "full_name": "Holdlamis Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3255",
        "id": 2,
        "city": "Minneapolis",
        "state": "Minnesota",
        "st": "MN",
        "address": "6337 Butternut Crossing",
        "zip": "55402",
        "lat": 44.9762,
        "long": -93.2759,
        "short_name": "Temp",
        "full_name": "Temp Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3256",
        "id": 3,
        "city": "Birmingham",
        "state": "Alabama",
        "st": "AL",
        "address": "9477 Twin Pines Center",
        "zip": "35285",
        "lat": 33.5446,
        "long": -86.9292,
        "short_name": "Sub-Ex",
        "full_name": "Sub-Ex Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3257",
        "id": 4,
        "city": "Dallas",
        "state": "Texas",
        "st": "TX",
        "address": "85800 Hazelcrest Circle",
        "zip": "75241",
        "lat": 32.6722,
        "long": -96.7774,
        "short_name": "Solarbreeze",
        "full_name": "Solarbreeze Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3258",
        "id": 5,
        "city": "Baltimore",
        "state": "Maryland",
        "st": "MD",
        "address": "93 Golf Course Pass",
        "zip": "21203",
        "lat": 39.2847,
        "long": -76.6205,
        "short_name": "Regrant",
        "full_name": "Regrant Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3259",
        "id": 6,
        "city": "Wilkes Barre",
        "state": "Pennsylvania",
        "st": "PA",
        "address": "2 Burrows Hill",
        "zip": "18763",
        "lat": 41.2722,
        "long": -75.8801,
        "short_name": "Stronghold",
        "full_name": "Stronghold Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc325a",
        "id": 7,
        "city": "Pueblo",
        "state": "Colorado",
        "st": "CO",
        "address": "9 Cambridge Park",
        "zip": "81010",
        "lat": 38.1286,
        "long": -104.5523,
        "short_name": "Job",
        "full_name": "Job Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc325b",
        "id": 8,
        "city": "Topeka",
        "state": "Kansas",
        "st": "KS",
        "address": "288 Larry Place",
        "zip": "66642",
        "lat": 39.0429,
        "long": -95.7697,
        "short_name": "Bytecard",
        "full_name": "Bytecard Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc325c",
        "id": 9,
        "city": "Dallas",
        "state": "Texas",
        "st": "TX",
        "address": "253 Hanson Junction",
        "zip": "75216",
        "lat": 32.7086,
        "long": -96.7955,
        "short_name": "Job",
        "full_name": "Job Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc325d",
        "id": 10,
        "city": "Washington",
        "state": "District of Columbia",
        "st": "DC",
        "address": "108 Memorial Pass",
        "zip": "20005",
        "lat": 38.9067,
        "long": -77.0312,
        "short_name": "Alphazap",
        "full_name": "Alphazap Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc325e",
        "id": 11,
        "city": "Carol Stream",
        "state": "Illinois",
        "st": "IL",
        "address": "8108 Dryden Court",
        "zip": "60351",
        "lat": 41.9166,
        "long": -88.1208,
        "short_name": "Rank",
        "full_name": "Rank Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc325f",
        "id": 12,
        "city": "Silver Spring",
        "state": "Maryland",
        "st": "MD",
        "address": "168 Pawling Lane",
        "zip": "20918",
        "lat": 39.144,
        "long": -77.2076,
        "short_name": "Tin",
        "full_name": "Tin Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3260",
        "id": 13,
        "city": "Baltimore",
        "state": "Maryland",
        "st": "MD",
        "address": "452 Fair Oaks Drive",
        "zip": "21275",
        "lat": 39.2847,
        "long": -76.6205,
        "short_name": "Y-Solowarm",
        "full_name": "Y-Solowarm Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3261",
        "id": 14,
        "city": "San Francisco",
        "state": "California",
        "st": "CA",
        "address": "2109 Scott Parkway",
        "zip": "94147",
        "lat": 37.7848,
        "long": -122.7278,
        "short_name": "It",
        "full_name": "It Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3262",
        "id": 15,
        "city": "San Antonio",
        "state": "Texas",
        "st": "TX",
        "address": "5057 Pankratz Hill",
        "zip": "78225",
        "lat": 29.3875,
        "long": -98.5245,
        "short_name": "Tempsoft",
        "full_name": "Tempsoft Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3263",
        "id": 16,
        "city": "El Paso",
        "state": "Texas",
        "st": "TX",
        "address": "0 Rieder Trail",
        "zip": "79994",
        "lat": 31.6948,
        "long": -106.3,
        "short_name": "Treeflex",
        "full_name": "Treeflex Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3264",
        "id": 17,
        "city": "San Jose",
        "state": "California",
        "st": "CA",
        "address": "7670 American Ash Drive",
        "zip": "95138",
        "lat": 37.2602,
        "long": -121.7709,
        "short_name": "Home Ing",
        "full_name": "Home Ing Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3265",
        "id": 18,
        "city": "Whittier",
        "state": "California",
        "st": "CA",
        "address": "4 Pearson Avenue",
        "zip": "90605",
        "lat": 33.9413,
        "long": -118.0356,
        "short_name": "Bitchip",
        "full_name": "Bitchip Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3266",
        "id": 19,
        "city": "Hialeah",
        "state": "Florida",
        "st": "FL",
        "address": "93 Monument Circle",
        "zip": "33013",
        "lat": 25.8594,
        "long": -80.2725,
        "short_name": "Otcom",
        "full_name": "Otcom Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3267",
        "id": 20,
        "city": "Detroit",
        "state": "Michigan",
        "st": "MI",
        "address": "4580 Waubesa Lane",
        "zip": "48224",
        "lat": 42.4098,
        "long": -82.9441,
        "short_name": "Subin",
        "full_name": "Subin Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3268",
        "id": 21,
        "city": "San Francisco",
        "state": "California",
        "st": "CA",
        "address": "046 Mockingbird Junction",
        "zip": "94154",
        "lat": 37.7848,
        "long": -122.7278,
        "short_name": "Andalax",
        "full_name": "Andalax Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3269",
        "id": 22,
        "city": "Fort Lauderdale",
        "state": "Florida",
        "st": "FL",
        "address": "45737 Butternut Lane",
        "zip": "33330",
        "lat": 26.0663,
        "long": -80.3339,
        "short_name": "Y-Solowarm",
        "full_name": "Y-Solowarm Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc326a",
        "id": 23,
        "city": "Des Moines",
        "state": "Iowa",
        "st": "IA",
        "address": "21425 Bartelt Pass",
        "zip": "50936",
        "lat": 41.6727,
        "long": -93.5722,
        "short_name": "Bitchip",
        "full_name": "Bitchip Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc326b",
        "id": 24,
        "city": "Utica",
        "state": "New York",
        "st": "NY",
        "address": "408 Delaware Circle",
        "zip": "13505",
        "lat": 43.0872,
        "long": -75.2603,
        "short_name": "Aerified",
        "full_name": "Aerified Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc326c",
        "id": 25,
        "city": "Washington",
        "state": "District of Columbia",
        "st": "DC",
        "address": "6505 Melrose Junction",
        "zip": "20580",
        "lat": 38.8933,
        "long": -77.0146,
        "short_name": "Opela",
        "full_name": "Opela Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc326d",
        "id": 26,
        "city": "Pittsburgh",
        "state": "Pennsylvania",
        "st": "PA",
        "address": "306 Jenna Parkway",
        "zip": "15279",
        "lat": 40.4344,
        "long": -80.0248,
        "short_name": "Flowdesk",
        "full_name": "Flowdesk Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc326e",
        "id": 27,
        "city": "San Antonio",
        "state": "Texas",
        "st": "TX",
        "address": "95321 Superior Hill",
        "zip": "78245",
        "lat": 29.4189,
        "long": -98.6895,
        "short_name": "Namfix",
        "full_name": "Namfix Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc326f",
        "id": 28,
        "city": "Hialeah",
        "state": "Florida",
        "st": "FL",
        "address": "5458 Maple Way",
        "zip": "33018",
        "lat": 25.9098,
        "long": -80.3889,
        "short_name": "Fixflex",
        "full_name": "Fixflex Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3270",
        "id": 29,
        "city": "San Francisco",
        "state": "California",
        "st": "CA",
        "address": "9 Harper Circle",
        "zip": "94110",
        "lat": 37.7509,
        "long": -122.4153,
        "short_name": "Fix San",
        "full_name": "Fix San Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3271",
        "id": 30,
        "city": "Houston",
        "state": "Texas",
        "st": "TX",
        "address": "5423 Spaight Road",
        "zip": "77218",
        "lat": 29.834,
        "long": -95.4342,
        "short_name": "Opela",
        "full_name": "Opela Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3272",
        "id": 31,
        "city": "New York City",
        "state": "New York",
        "st": "NY",
        "address": "5 Northfield Pass",
        "zip": "10131",
        "lat": 40.7808,
        "long": -73.9772,
        "short_name": "Fintone",
        "full_name": "Fintone Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3273",
        "id": 32,
        "city": "Wilkes Barre",
        "state": "Pennsylvania",
        "st": "PA",
        "address": "3 Carey Junction",
        "zip": "18768",
        "lat": 41.2722,
        "long": -75.8801,
        "short_name": "Subin",
        "full_name": "Subin Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3274",
        "id": 33,
        "city": "Des Moines",
        "state": "Iowa",
        "st": "IA",
        "address": "627 Cottonwood Circle",
        "zip": "50335",
        "lat": 41.6727,
        "long": -93.5722,
        "short_name": "Tres-Zap",
        "full_name": "Tres-Zap Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3275",
        "id": 34,
        "city": "Silver Spring",
        "state": "Maryland",
        "st": "MD",
        "address": "8 Green Hill",
        "zip": "20904",
        "lat": 39.0668,
        "long": -76.9969,
        "short_name": "Gembucket",
        "full_name": "Gembucket Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3276",
        "id": 35,
        "city": "Seattle",
        "state": "Washington",
        "st": "WA",
        "address": "9 Beilfuss Trail",
        "zip": "98158",
        "lat": 47.4497,
        "long": -122.3076,
        "short_name": "Treeflex",
        "full_name": "Treeflex Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3277",
        "id": 36,
        "city": "Vienna",
        "state": "Virginia",
        "st": "VA",
        "address": "311 Paget Alley",
        "zip": "22184",
        "lat": 38.8318,
        "long": -77.2888,
        "short_name": "Latlux",
        "full_name": "Latlux Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3278",
        "id": 37,
        "city": "Detroit",
        "state": "Michigan",
        "st": "MI",
        "address": "152 Moland Lane",
        "zip": "48224",
        "lat": 42.4098,
        "long": -82.9441,
        "short_name": "Ventosanzap",
        "full_name": "Ventosanzap Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3279",
        "id": 38,
        "city": "Dallas",
        "state": "Texas",
        "st": "TX",
        "address": "821 New Castle Trail",
        "zip": "75226",
        "lat": 32.7887,
        "long": -96.7676,
        "short_name": "Zamit",
        "full_name": "Zamit Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc327a",
        "id": 39,
        "city": "Fresno",
        "state": "California",
        "st": "CA",
        "address": "990 Raven Road",
        "zip": "93740",
        "lat": 36.7464,
        "long": -119.6397,
        "short_name": "Stronghold",
        "full_name": "Stronghold Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc327b",
        "id": 40,
        "city": "Merrifield",
        "state": "Virginia",
        "st": "VA",
        "address": "89375 Main Trail",
        "zip": "22119",
        "lat": 38.8318,
        "long": -77.2888,
        "short_name": "Greenlam",
        "full_name": "Greenlam Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc327c",
        "id": 41,
        "city": "Baltimore",
        "state": "Maryland",
        "st": "MD",
        "address": "9 Sherman Hill",
        "zip": "21275",
        "lat": 39.2847,
        "long": -76.6205,
        "short_name": "Tres-Zap",
        "full_name": "Tres-Zap Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc327d",
        "id": 42,
        "city": "Jersey City",
        "state": "New Jersey",
        "st": "NJ",
        "address": "62 Manley Point",
        "zip": "07310",
        "lat": 40.7324,
        "long": -74.0431,
        "short_name": "Konklab",
        "full_name": "Konklab Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc327e",
        "id": 43,
        "city": "Atlanta",
        "state": "Georgia",
        "st": "GA",
        "address": "91 Declaration Avenue",
        "zip": "31119",
        "lat": 33.8913,
        "long": -84.0746,
        "short_name": "Opela",
        "full_name": "Opela Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc327f",
        "id": 44,
        "city": "Roanoke",
        "state": "Virginia",
        "st": "VA",
        "address": "0 Northview Point",
        "zip": "24014",
        "lat": 37.2327,
        "long": -79.9463,
        "short_name": "Veribet",
        "full_name": "Veribet Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3280",
        "id": 45,
        "city": "Norfolk",
        "state": "Virginia",
        "st": "VA",
        "address": "283 Mockingbird Plaza",
        "zip": "23509",
        "lat": 36.8787,
        "long": -76.2604,
        "short_name": "Konklux",
        "full_name": "Konklux Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3281",
        "id": 46,
        "city": "New Orleans",
        "state": "Louisiana",
        "st": "LA",
        "address": "527 Hayes Junction",
        "zip": "70165",
        "lat": 30.033,
        "long": -89.8826,
        "short_name": "Regrant",
        "full_name": "Regrant Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3282",
        "id": 47,
        "city": "Stamford",
        "state": "Connecticut",
        "st": "CT",
        "address": "840 Pepper Wood Crossing",
        "zip": "06905",
        "lat": 41.0888,
        "long": -73.5435,
        "short_name": "Prodder",
        "full_name": "Prodder Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3283",
        "id": 48,
        "city": "Tucson",
        "state": "Arizona",
        "st": "AZ",
        "address": "48610 Morning Street",
        "zip": "85710",
        "lat": 32.2138,
        "long": -110.824,
        "short_name": "It",
        "full_name": "It Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3284",
        "id": 49,
        "city": "Athens",
        "state": "Georgia",
        "st": "GA",
        "address": "222 Grasskamp Plaza",
        "zip": "30605",
        "lat": 33.9321,
        "long": -83.3525,
        "short_name": "Veribet",
        "full_name": "Veribet Car Dealership"
    },
    {
        "_id": "6add419aaf3d238fd0dc3285",
        "id": 50,
        "city": "Atlanta",
        "state": "Georgia",
        "st": "GA",
        "address": "76 Clove Trail",
        "zip": "30316",
        "lat": 33.7217,
        "long": -84.3339,
        "short_name": "Aerified",
        "full_name": "Aerified Car Dealership"
    }
]
```

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
