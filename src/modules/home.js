/**
 * Home Page Module
 * 
 * Generates the Home/Hero page dynamically using JavaScript DOM manipulation.
 * This demonstrates the Odin Project learning goal: practicing DOM creation
 * instead of hard-coding HTML.
 */

export function loadHome() {
  // Get the content container where we'll inject the page
  const content = document.getElementById('content');
  
  // Clear any existing content
  content.innerHTML = '';

  // Create the hero section
  const heroSection = document.createElement('section');
  heroSection.classList.add('hero');

  // Create the main heading with styled span
  const heading = document.createElement('h1');
  
  // "Snap Into " text
  const snapIntoText = document.createTextNode('Snap Into ');
  
  // "Flavor" span with special styling
  const flavorSpan = document.createElement('span');
  flavorSpan.textContent = 'Flavor';
  
  heading.appendChild(snapIntoText);
  heading.appendChild(flavorSpan);

  // Create the tagline/subtitle
  const tagline = document.createElement('p');
  tagline.textContent = 'SnapBite is a feeling for foodies';

  // Create the button container
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('hero-buttons');

  // Create "View Menu" button
  const menuBtn = document.createElement('button');
  menuBtn.classList.add('menu-btn');
  menuBtn.textContent = 'View Menu';
  menuBtn.addEventListener('click', () => {
    // Emit event to switch to menu tab
    // (This will be handled by the navigation in index.js)
    window.dispatchEvent(new CustomEvent('switchTab', { detail: { tab: 'menu' } }));
  });

  // Create "Order Now" button
  const orderBtn = document.createElement('button');
  orderBtn.classList.add('order-btn');
  orderBtn.textContent = 'Order Now';
  orderBtn.addEventListener('click', () => {
    alert('Order functionality coming soon!');
  });

  // Append buttons to container
  buttonContainer.appendChild(menuBtn);
  buttonContainer.appendChild(orderBtn);

  // Append all elements to the hero section
  heroSection.appendChild(heading);
  heroSection.appendChild(tagline);
  heroSection.appendChild(buttonContainer);

  // Append the hero section to the content container
  content.appendChild(heroSection);
}
