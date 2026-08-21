/**
 * Menu Page Module
 * 
 * Demonstrates data-driven development:
 * - Separate data (menu items) from presentation (DOM creation)
 * - Use arrays and loops to generate DOM dynamically
 * - Easy to add/remove/modify menu items
 */

// Menu items data - Easy to modify!
const menuItems = [
  {
    id: 1,
    name: 'Burger',
    description: 'A classic grilled patty topped with melted cheese, crisp lettuce, fresh tomato, and creamy sauce.',
    price: '₹99',
    image: 'https://img.magnific.com/premium-photo/fast-burger-food-fat-meat-sandwich-food-snack-hamburger-beef-fast-generative-ai_163305-241072.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 2,
    name: 'Pizza',
    description: 'A delicious pizza with a variety of toppings and a crispy crust.',
    price: '₹149',
    image: 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*'
  },
  {
    id: 3,
    name: 'Hot Dog',
    description: 'A juicy hot dog served with your choice of condiments.',
    price: '₹179',
    image: 'https://images.getrecipekit.com/20250517230831-website-20thumbnail.jpg?aspect_ratio=4:3&quality=90&'
  },
  {
    id: 4,
    name: 'Sandwich',
    description: 'A tasty sandwich with fresh ingredients and a variety of fillings.',
    price: '₹99',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/056/864/879/small/grilled-chicken-sandwich-with-fresh-vegetables-on-toasted-bread-prepared-in-a-cozy-kitchen-setting-photo.jpeg'
  },
  {
    id: 5,
    name: 'Tacos',
    description: 'Delicious tacos with a variety of fillings and fresh salsa.',
    price: '₹119',
    image: 'https://st.depositphotos.com/1328914/4737/i/450/depositphotos_47376901-stock-photo-three-beef-tacos-with-cheese.jpg'
  },
  {
    id: 6,
    name: 'Maggie',
    description: 'Just like your favorite mountain-top bowl—simple, soulful, and packed with classic nostalgic flavors.',
    price: '₹69',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBw0OK3Lg5G7mGb712puI1xwutFEcqivIPCgt-3iiDGuapB-pqJC_FTq0&s=10'
  }
];

/**
 * Load the menu page
 * Creates the menu section with all items from the menuItems array
 */
export function loadMenu() {
  // Get the content container
  const content = document.getElementById('content');
  
  // Clear any existing content
  content.innerHTML = '';

  // Create the menu section
  const menuSection = document.createElement('section');
  menuSection.classList.add('menu');

  // Create the menu heading
  const heading = document.createElement('h2');
  heading.textContent = 'Our Menu';
  menuSection.appendChild(heading);

  // Create the menu items container
  const itemsContainer = document.createElement('div');
  itemsContainer.classList.add('menu-items');

  // Loop through each menu item and create DOM elements
  menuItems.forEach(item => {
    // Create menu item card
    const menuItemDiv = document.createElement('div');
    menuItemDiv.classList.add('menu-item');
    menuItemDiv.setAttribute('data-id', item.id);

    // Create and add image
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    menuItemDiv.appendChild(img);

    // Create and add item name
    const itemName = document.createElement('h3');
    itemName.textContent = item.name;
    menuItemDiv.appendChild(itemName);

    // Create and add description
    const description = document.createElement('p');
    description.textContent = item.description;
    menuItemDiv.appendChild(description);

    // Create and add price
    const priceSpan = document.createElement('span');
    priceSpan.classList.add('price');
    priceSpan.textContent = item.price;
    menuItemDiv.appendChild(priceSpan);

    // Create and add "Add to Cart" button
    const addBtn = document.createElement('button');
    addBtn.classList.add('add-btn');
    addBtn.textContent = 'Add +';
    addBtn.addEventListener('click', () => {
      handleAddToCart(item.name, item.price);
    });
    menuItemDiv.appendChild(addBtn);

    // Add the menu item to the container
    itemsContainer.appendChild(menuItemDiv);
  });

  // Add items container to menu section
  menuSection.appendChild(itemsContainer);

  // Add menu section to content
  content.appendChild(menuSection);
}

/**
 * Handle adding item to cart
 * (This is a placeholder - you can expand this later)
 */
function handleAddToCart(itemName, price) {
  alert(`${itemName} (${price}) added to cart!`);
  // In a real app, this would add to a cart and update a counter
}
