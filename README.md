# SnapBite Restaurant Website

SnapBite is a responsive restaurant website built with HTML, CSS, and JavaScript. Its Express server also provides a REST API for menu management and reservation submissions.

The site is published on GitHub Pages:

[Open the SnapBite website](https://snehavyas-dev.github.io/snapbite-restaurant-website/)

GitHub Pages hosts the static frontend only. The Express API must be run or deployed separately.

## Features

- Home, Menu, and Contact views with tab navigation
- Menu cards rendered from JavaScript data
- Responsive layout for desktop, tablet, and mobile
- Reservation form submitted to the Express reservation API
- Express REST API with menu CRUD endpoints
- Separate reservation API backed by SQLite

> The website's Contact form submits to the Express reservation API. GitHub Pages cannot run the API, so it must be deployed separately and configured with `API_BASE_URL`.

## Technologies

- HTML5, CSS3, JavaScript ES modules
- Node.js and Express
- SQLite (`node:sqlite`)
- Webpack 5
- GitHub Pages

## Project structure

```text
src/
├── index.js
├── template.html
├── modules/
│   ├── api.js
│   ├── contact.js
│   ├── home.js
│   ├── menu.js
│   └── owner.js
└── styles/
    └── style.css
server/
├── server.js
├── routes/
│   ├── menuRoutes.js
│   └── reservationRoutes.js
├── controllers/
│   ├── menuController.js
│   └── reservationController.js
└── data/
    ├── menuData.js
    ├── reservationStore.js
    └── reservations.sqlite
test/
└── reservations.test.js
webpack.config.js
package.json
```

## Run locally

### Requirements

- Node.js 22.13 or later
- npm

Install dependencies:

```bash
npm install
```

### Frontend development

Start the Express API in one terminal:

```bash
npm run api
```

In another terminal, start the Webpack development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The development server proxies `/api` requests to the API on port 3001.

### Build and serve the frontend with Express

Build the static site, then start the server:

```bash
npm run build
npm start
```

The Express server listens on port 3001 by default and serves the built `dist/` files alongside the API. Set `PORT` to change the server port.

### Run tests

```bash
npm test
```

## REST API

The API base URL is `http://localhost:3001`. Menu data is held in memory and resets when the server restarts. Reservation submissions made directly to the API are stored in SQLite.

| Method | Endpoint | Description | Success |
|---|---|---|---|
| GET | `/api` | Check that the API is running | 200 |
| GET | `/api/menu` | Get all menu items | 200 |
| GET | `/api/menu/:id` | Get a menu item | 200 |
| POST | `/api/menu` | Create a menu item | 201 |
| PUT | `/api/menu/:id` | Replace a menu item | 200 |
| DELETE | `/api/menu/:id` | Delete a menu item | 200 |
| POST | `/api/reservations` | Validate and save a reservation | 201 |
| GET | `/api/reservations` | List reservations (owner password required) | 200 |

Menu and reservation endpoints return JSON with a `success` field and either `data` or `error`. Invalid input returns `400`; missing menu items return `404`. The reservation-list endpoint returns `401` if the password is missing or incorrect, and `503` if owner access has not been configured.

### Menu item example

```json
{
  "name": "Margherita Pizza",
  "category": "Pizza",
  "price": 299,
  "description": "Classic tomato and mozzarella pizza",
  "image": "https://example.com/margherita-pizza.jpg"
}
```

Send this JSON to `POST /api/menu` with the `Content-Type: application/json` header. The API assigns the item an ID and returns it in the response.

### Reservation storage and owner access

Reservations sent to `POST /api/reservations` are stored in `server/data/reservations.sqlite` by default. Set `DATABASE_PATH` to use a different SQLite file. Set `OWNER_PASSWORD` to enable `GET /api/reservations`; provide it as a bearer token in the `Authorization` header:

```text
Authorization: Bearer your-owner-password
```

For example, set the password in PowerShell before starting the API:

```powershell
$env:OWNER_PASSWORD = "use-a-long-private-password"
npm run api
```

Do not commit the password or put it in frontend code.

## Production build and deployment

Create a production build:

```bash
npm run build
```

Deploy the static frontend to GitHub Pages (requires the `gh-pages` package and GitHub publishing access):

```bash
npm run deploy
```

The API is not deployed by GitHub Pages. To use the API in production, deploy the Express server separately, set `API_BASE_URL` when building the frontend, configure `OWNER_PASSWORD` and an appropriate `FRONTEND_ORIGIN`, and provide persistent storage for the SQLite database.

## Learning goals

This project practices modular JavaScript, DOM rendering, responsive CSS, Webpack, Express routing, REST methods, CRUD operations, input validation, JSON APIs, and SQLite persistence.

## About

Built by [Sneha Vyas](https://github.com/snehavyas-dev) as part of a learning journey that includes [The Odin Project's Restaurant Page](https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page).

- [Portfolio](https://snehavyas-dev.github.io/sneha-vyas-dev-portfolio/)
- [LinkedIn](https://www.linkedin.com/in/sneha-vyas-94a0bb3a3/)
