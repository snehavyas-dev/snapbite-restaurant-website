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

  const heroCopy = document.createElement('div');
  heroCopy.classList.add('hero-copy');

  const eyebrow = document.createElement('p');
  eyebrow.classList.add('eyebrow');
  eyebrow.textContent = 'Fast comfort, made memorable';
  heroCopy.appendChild(eyebrow);

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
    window.dispatchEvent(new CustomEvent('switchTab', { detail: { tab: 'contact' } }));
    window.showToast('Reserve your table and make it a SnapBite moment.');
  });

  // Append buttons to container
  buttonContainer.appendChild(menuBtn);
  buttonContainer.appendChild(orderBtn);

  // Append all elements to the hero section
  heroCopy.appendChild(heading);
  heroCopy.appendChild(tagline);
  heroCopy.appendChild(buttonContainer);

  const heroVisual = document.createElement('div');
  heroVisual.classList.add('hero-visual');
  heroVisual.setAttribute('aria-label', 'SnapBite signature burger');

  const visualGlow = document.createElement('div');
  visualGlow.classList.add('visual-glow');
  heroVisual.appendChild(visualGlow);

  const burger = document.createElement('div');
  burger.classList.add('burger-art');
  burger.textContent = '🍔';
  heroVisual.appendChild(burger);

  const visualBadge = document.createElement('div');
  visualBadge.classList.add('visual-badge');
  visualBadge.innerHTML = '<strong>4.9/5</strong><span>loved by foodies</span>';
  heroVisual.appendChild(visualBadge);

  heroSection.appendChild(heroCopy);
  heroSection.appendChild(heroVisual);

  // Append the hero section to the content container
  content.appendChild(heroSection);
}
