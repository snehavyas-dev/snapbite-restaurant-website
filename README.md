# 🍔 SnapBite — Restaurant Website + RESTful API

<<<<<<< HEAD
SnapBite is a modern, responsive restaurant website built with HTML, CSS, and JavaScript. It includes dynamic page views, a data-driven menu, a working reservation form backed by a persistent SQLite database, and an Express.js REST API.
=======
A modern, responsive restaurant website built with **HTML, CSS, and JavaScript**, featuring dynamic page views, a data-driven menu, reservation form validation, and an **Express.js RESTful API** for menu management.
>>>>>>> 844030bdccf9984ef35eb51338cc7419e79b58b7

The project began as a personal web-development exercise and as part of **The Odin Project's Restaurant Page project**. For **Web Application Development Practical 5**, the existing frontend was extended with a **Node.js and Express.js backend** without replacing or redesigning the original website.

---

## 🌐 Live Demo

[Visit SnapBite on GitHub Pages](https://snehavyas-dev.github.io/snapbite-restaurant-website/)

<<<<<<< HEAD
The GitHub Pages deployment contains the static frontend. Deploy the REST API separately because GitHub Pages does not execute Node.js servers.
=======
> The GitHub Pages deployment contains the static frontend. The REST API runs locally because GitHub Pages does not execute Node.js servers.
>>>>>>> 844030bdccf9984ef35eb51338cc7419e79b58b7

---

## ✨ Features

<<<<<<< HEAD
- Home, Menu, and Contact views
- Tab-based navigation
- Dynamic menu cards generated from JavaScript data
- Reservation form with browser validation
- Reservation requests saved to the server database
- Password-protected owner dashboard for reviewing reservations
- Responsive layout for desktop, tablet, and mobile
- Interactive buttons, hover effects, and accessible image alt text
- Webpack-powered development workflow
- GitHub Pages deployment
=======
### 🎨 Frontend
>>>>>>> 844030bdccf9984ef35eb51338cc7419e79b58b7

- 🏠 Home, Menu, and Contact views
- 🧭 Tab-based navigation
- 🍔 Dynamic menu cards generated from JavaScript data
- 📝 Reservation form with browser validation
- ✅ Reservation confirmation feedback
- 📱 Responsive layout for desktop, tablet, and mobile
- 🖱️ Interactive buttons, hover effects, and accessible image alt text
- ⚡ Webpack-powered development workflow
- 🌐 GitHub Pages deployment

<<<<<<< HEAD
- Node.js and Express.js server
- RESTful menu resource
- Complete CRUD operations
- JSON request and response handling
- `express.json()` middleware
- Route parameters for menu item IDs
- Validation for required fields and prices
- Consistent success and error responses
- HTTP status codes for successful and failed requests
- In-memory server-side menu data for simple practical demonstration
- SQLite-backed reservation storage
=======
### 🔌 Practical 5 REST API
>>>>>>> 844030bdccf9984ef35eb51338cc7419e79b58b7

- 🟢 Node.js and Express.js server
- 🍔 RESTful menu resource
- 🔄 Complete CRUD operations
- 📦 JSON request and response handling
- ⚙️ `express.json()` middleware
- 🔢 Route parameters for menu item IDs
- ✅ Validation for required fields and prices
- 📋 Consistent success and error responses
- 🌐 HTTP status codes for successful and failed requests
- 💾 In-memory server-side menu data for simple practical demonstration

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript ES6+
- ES Modules
- DOM Manipulation
- Webpack 5
- Node.js
- Express.js
- REST API
- JSON
- Postman or another REST client
- Git and GitHub
- GitHub Pages

---

## 📂 Project Structure

~~~~text
src/
├── index.js                 # Frontend entry point and navigation
├── template.html            # Webpack HTML template
├── modules/
│   ├── home.js              # Home view
│   ├── menu.js              # Data-driven menu view
<<<<<<< HEAD
│   ├── contact.js           # Contact and reservation view
│   ├── owner.js             # Password-protected reservation dashboard
│   └── api.js               # API URL configuration
=======
│   └── contact.js           # Contact and reservation view
>>>>>>> 844030bdccf9984ef35eb51338cc7419e79b58b7
└── styles/
    └── style.css            # Responsive visual styling

server/
├── server.js                # Express API entry point
├── routes/
│   ├── menuRoutes.js        # Menu API routes
│   └── reservationRoutes.js # Reservation API routes
├── controllers/
│   ├── menuController.js    # Menu CRUD logic and validation
│   └── reservationController.js
└── data/
<<<<<<< HEAD
    ├── menuData.js          # In-memory API menu data
    └── reservationStore.js  # Persistent SQLite reservation storage
=======
    └── menuData.js          # In-memory API menu data

>>>>>>> 844030bdccf9984ef35eb51338cc7419e79b58b7
webpack.config.js            # Webpack configuration
package.json                # Scripts and dependencies
~~~~

---

# 🔌 REST API

The API is based on the same six menu items displayed by the frontend, so it is a genuine backend extension of SnapBite rather than an unrelated demonstration.

The frontend keeps its presentation-specific prices, such as `₹99`, while the API represents prices as numbers such as `99`. The API also includes a category field for structured data.

### Base URL

~~~~text
http://localhost:3001
~~~~

### 📡 Endpoints

| Method | Endpoint | Description | Success status |
|---|---|---|---|
| GET | `/api/menu` | Get all menu items | 200 OK |
| GET | `/api/menu/:id` | Get one menu item by ID | 200 OK |
| POST | `/api/menu` | Create a menu item | 201 Created |
| PUT | `/api/menu/:id` | Replace a menu item | 200 OK |
| DELETE | `/api/menu/:id` | Delete a menu item | 200 OK |
| POST | `/api/reservations` | Validate and save a reservation | 201 Created |
| GET | `/api/reservations` | List reservations (owner password required) | 200 OK |

Reservation requests are stored in `server/data/reservations.sqlite` by default. Set `DATABASE_PATH` to use another SQLite file. Set `OWNER_PASSWORD` before using the Owner tab; without it, owner access is disabled. The dashboard keeps the password only for the current browser tab.

### 🍔 Example Menu Item

~~~~json
{
  "id": 1,
  "name": "Burger",
  "category": "Burgers",
  "description": "A classic grilled patty topped with melted cheese, crisp lettuce, fresh tomato, and creamy sauce.",
  "price": 99,
  "image": "https://example.com/burger.jpg"
}
~~~~

### 📤 Example POST Request

Send a `POST` request to `/api/menu` with the `Content-Type: application/json` header:

~~~~json
{
  "name": "Margherita Pizza",
  "category": "Pizza",
  "price": 299,
  "description": "Classic tomato and mozzarella pizza",
  "image": "https://example.com/margherita-pizza.jpg"
}
~~~~

### 📥 Example Response

~~~~json
{
  "success": true,
  "data": {
    "id": 7,
    "name": "Margherita Pizza",
    "category": "Pizza",
    "price": 299,
    "description": "Classic tomato and mozzarella pizza",
    "image": "https://example.com/margherita-pizza.jpg"
  }
}
~~~~

### ⚠️ Error Responses

Errors use a consistent JSON format:

~~~~json
{
  "success": false,
  "error": "Menu item not found"
}
~~~~

The API uses these status codes:

- `200 OK` - Successful read, update, or delete
- `201 Created` - Menu item created successfully
- `400 Bad Request` - Invalid ID, missing fields, invalid price, or malformed JSON
- `404 Not Found` - Menu item or route does not exist
- `500 Internal Server Error` - Unexpected server-side failure

---

# 🔄 How the API Works

~~~~text
Client or Postman request
        |
        v
Express application
        |
        v
express.json() middleware
        |
        v
Menu route
        |
        v
Controller validation and CRUD logic
        |
        v
In-memory menu array
        |
        v
JSON response with HTTP status code
~~~~

The server stores data in memory for this practical. New, updated, or deleted items are reset when the server restarts. No database is required for demonstrating REST and CRUD concepts.

---

# 💻 Run Locally

### Requirements

- Node.js
- npm

### Installation

Clone the repository and install dependencies:

~~~~bash
git clone https://github.com/snehavyas-dev/snapbite-restaurant-website.git
cd snapbite-restaurant-website
npm install
~~~~

### 🎨 Start the Frontend

~~~~bash
npm start
~~~~

Open `http://localhost:3000` in a browser. Webpack Dev Server provides hot reload.

### 🔌 Start the REST API

Open another terminal in the project directory and run:

~~~~bash
npm run api
~~~~

The API starts at `http://localhost:3001`.

<<<<<<< HEAD
For local development, open the site with `npm start` and run the API in a second terminal. The webpack development server proxies `/api` requests to port 3001. Set an owner password before starting the API:

```powershell
$env:OWNER_PASSWORD = "use-a-long-private-password"
npm run api
```

### Deploying reservations

GitHub Pages only hosts the static frontend, so it cannot receive or save reservations by itself. Deploy the Express API separately. Render is a straightforward option for this project: create a Node web service, set `OWNER_PASSWORD` and `FRONTEND_ORIGIN` (for example, `https://snehavyas-dev.github.io`), and attach a persistent disk mounted at `/var/data`. Set `DATABASE_PATH` to `/var/data/reservations.sqlite`; without persistent storage the database may be lost when the service restarts or redeploys.

Build and deploy the GitHub Pages frontend with the deployed API URL configured. In PowerShell, for example:

```powershell
$env:API_BASE_URL = "https://your-api-service.onrender.com"
npm run deploy
```

Do not put the owner password in the frontend or commit it to the repository. Use HTTPS for the deployed API and set `FRONTEND_ORIGIN` to the exact frontend origin.

## Test with Postman
=======
---

# 🧪 Test with Postman
>>>>>>> 844030bdccf9984ef35eb51338cc7419e79b58b7

Start the API before testing. Use `http://localhost:3001` as the base URL.

1. Send `GET /api/menu`. Confirm a `200 OK` response containing the six initial items.
2. Send `GET /api/menu/1`. Confirm that the Burger item is returned with `200 OK`.
3. Send `POST /api/menu` with the example JSON. Confirm the new item and `201 Created`.
4. Send `PUT /api/menu/7` with an updated price or description. Confirm `200 OK` and the updated item.
5. Send `DELETE /api/menu/7`. Confirm `200 OK` and the deleted item.
6. Send `GET /api/menu/7` after deletion. Confirm `404 Not Found`.
7. Send a `POST /api/menu` request with missing fields or a string price. Confirm `400 Bad Request`.
8. Send `GET /api/menu/not-a-number`. Confirm `400 Bad Request`.
9. Send `GET /api/unknown`. Confirm `404 Not Found`.

These CRUD and error cases were verified against the running Express server.

---

# 🎨 Frontend Behavior

### 🏠 Home

Introduces SnapBite and provides navigation to the menu and contact views.

### 🍔 Menu

Generates menu cards dynamically from JavaScript objects. The existing frontend data and formatted price display are intentionally unchanged by the API work.

### 📬 Contact

Displays restaurant contact information and submits validated reservation requests to the backend. The Owner navigation tab shows saved requests after password verification.

---

# 🧠 Concepts Practiced

### Frontend

- JavaScript ES modules and import/export
- DOM manipulation and event handling
- Dynamic UI rendering
- Arrays, objects, and data-driven content
- Form validation
- Responsive design with CSS Grid, Flexbox, variables, and media queries
- Webpack configuration, development server, production builds, and deployment

### Practical 5 Backend

- Node.js runtime
- Express.js application and routing
- REST architecture and API endpoints
- HTTP methods: GET, POST, PUT, and DELETE
- CRUD: Create, Read, Update, and Delete
- JSON request and response format
- Middleware and `express.json()`
- Route parameters such as `:id`
- Input validation and error handling
- HTTP status codes
- Client-server communication

---

# 🚀 Production Build and Deployment

Create the frontend production build:

~~~~bash
npm run build
~~~~

Webpack generates deployable files in the ignored `dist/` directory.

Deploy the static frontend to GitHub Pages:

~~~~bash
npm run deploy
~~~~

The Express API must be deployed separately from the GitHub Pages frontend. See [Deploying reservations](#deploying-reservations) for the Render setup and persistent storage requirements.

---

# 💡 What I Learned

Building SnapBite helped me move from a static website toward a modular JavaScript application and then toward a client-server architecture.

Through this project, I learned how to:

- Organize frontend code using ES modules
- Generate UI with the DOM
- Manage repeated content with JavaScript data
- Configure and use Webpack
- Build responsive layouts and browser form validation
- Create an Express server and REST endpoints
- Parse JSON request bodies with middleware
- Implement menu CRUD operations
- Validate request data and return meaningful status codes
- Test APIs using Postman or a REST client
- Preserve an existing frontend while adding a backend layer

---

# 🔮 Future Improvements

<<<<<<< HEAD
**Objective:** Implement and understand REST API using Node.js and Express.

This implementation satisfies the practical objective by adding an Express-based menu API with JSON responses, middleware, route parameters, complete CRUD operations, validation, error handling, and tested HTTP status codes to the existing SnapBite project.

## The Odin Project

This project was also created as part of my learning journey through [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page). It helped me practice the transition from a simple static website to a structured, modular JavaScript application.

## Future Improvements

- Connect the menu API to a database
- Add an online ordering and cart system
- Send reservation notifications by email
- Add customer reviews and location information
- Deploy the API alongside the frontend on a Node.js-compatible hosting platform

## About the Developer

Hi! I'm **Sneha Vyas**, a B.Tech Computer Science and Engineering student and aspiring Full Stack Developer.

I'm strengthening my JavaScript skills through hands-on projects and progressing toward React, Node.js, and full-stack development.

## Connect With Me

- [Portfolio](https://snehavyas-dev.github.io/sneha-vyas-dev-portfolio/)
- [LinkedIn](https://www.linkedin.com/in/sneha-vyas-94a0bb3a3/)
- [GitHub](https://github.com/snehavyas-dev)
- Email: **snehavyas250@gmail.com**
=======
- 🗄️ Connect the API to a database for persistent menu data
- 🔗 Connect the frontend to the API with `fetch()` while preserving static deployment support
- 🛒 Add an online ordering and cart system
- 📬 Store reservations through a backend endpoint
- 🔐 Add authentication for protected management operations
- ⭐ Add customer reviews and location information
- 🌐 Deploy the API alongside the frontend on a Node.js-compatible hosting platform
>>>>>>> 844030bdccf9984ef35eb51338cc7419e79b58b7

---

# 🌱 Learning Journey

SnapBite represents an important step in my progression from frontend development toward full-stack development.

The project evolved from a restaurant frontend into a practical exercise involving:

**Frontend → Modular JavaScript → Node.js → Express.js → REST API → CRUD → Client-Server Architecture**

I'm following a simple approach:

**Learn → Build → Improve → Repeat 🔁**

---

# 👩‍💻 About the Developer

Hi! I'm **Sneha Vyas**, a B.Tech Computer Science and Engineering student and aspiring Full Stack Developer.

I'm strengthening my JavaScript skills through hands-on projects and progressing toward **React, Node.js, and full-stack development**.

---

# 🔗 Connect With Me

- 🌐 [Portfolio](https://snehavyas-dev.github.io/sneha-vyas-dev-portfolio/)
- 💼 [LinkedIn](https://www.linkedin.com/in/sneha-vyas-94a0bb3a3/)
- 🐙 [GitHub](https://github.com/snehavyas-dev)
- 📧 Email: **snehavyas250@gmail.com**

---

⭐ If you like this project, feel free to explore my other repositories!

Made with ❤️ by **Sneha Vyas**
