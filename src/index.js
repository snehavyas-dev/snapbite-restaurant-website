// Import CSS
import './styles/style.css';

// Import all page modules
import { loadHome } from './modules/home.js';
import { loadMenu } from './modules/menu.js';
import { loadContact } from './modules/contact.js';

// Load the home page when the page first loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ SnapBite app loaded!');
  
  // Load the home page initially
  loadHome();
  
  // Mark Home button as active
  updateActiveTab('home');
  
  // Set up navigation button listeners
  setupNavigation();
});

window.showToast = function showToast(message) {
  let toast = document.querySelector('.toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.classList.add('toast');
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(window.toastTimer);
  window.toastTimer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
};

/**
 * Set up click listeners for navigation buttons
 */
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const tabName = e.target.getAttribute('data-tab');
      updateActiveTab(tabName);
      
      // Load the appropriate page module
      switch(tabName) {
        case 'home':
          loadHome();
          break;
        case 'menu':
          loadMenu();
          break;
        case 'contact':
          loadContact();
          break;
        default:
          loadHome();
      }
    });
  });
}

/**
 * Update which navigation button is marked as active
 */
function updateActiveTab(tabName) {
  // Remove 'active' class from all buttons
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => btn.classList.remove('active'));
  
  // Add 'active' class to the current tab button
  const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

/**
 * Handle custom tab switch events (from "View Menu" button on home page)
 */
window.addEventListener('switchTab', (e) => {
  const tabName = e.detail.tab;
  updateActiveTab(tabName);
  
  switch(tabName) {
    case 'menu':
      loadMenu();
      break;
    default:
      loadHome();
  }
});
