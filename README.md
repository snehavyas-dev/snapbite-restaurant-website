# SnapBite Restaurant Page

SnapBite is a fast-casual restaurant page built for The Odin Project. It preserves the original restaurant design while using Webpack, ES modules, and vanilla JavaScript to generate each view dynamically.

## Live Site

[View SnapBite on GitHub Pages](https://snehavyas-dev.github.io/snapbite-restaurant-website/)

## Features

- Home, menu, and contact views with tab navigation
- Data-driven menu cards generated from JavaScript objects
- Reservation form with browser validation and confirmation feedback
- Responsive layout for desktop, tablet, and mobile screens
- Interactive buttons, hover states, and accessible image alt text

## Built With

- HTML5
- CSS3, including Grid, Flexbox, CSS variables, media queries, and `clamp()`
- JavaScript ES modules and DOM manipulation
- Webpack 5
- GitHub Pages

## Run Locally

Requirements: Node.js and npm.

```bash
npm install
npm start
```

Open `http://localhost:3000` in your browser. Webpack Dev Server provides hot reload while you work.

## Production Build

```bash
npm run build
```

Webpack creates the deployable files in the ignored `dist/` directory.

## Deploy to GitHub Pages

The repository is configured to publish `dist/` to the `gh-pages` branch:

```bash
npm run deploy
```

After deployment, GitHub Pages serves the site at:

`https://snehavyas-dev.github.io/snapbite-restaurant-website/`

The deployment command requires push access to the repository and uses the configured `origin` remote.

## Project Structure

```text
src/
├── index.js                 # Application entry point and navigation
├── template.html            # Webpack HTML template
├── modules/
│   ├── home.js              # Home view
│   ├── menu.js              # Data-driven menu view
│   └── contact.js            # Contact and reservation view
└── styles/
	└── style.css            # Responsive visual styling
webpack.config.js             # Webpack and dev server configuration
```

## Learning Goals

This project practices separating application concerns into ES modules, creating UI with DOM APIs, managing repeated content with data arrays, bundling assets with Webpack, and publishing a production build with GitHub Pages.
