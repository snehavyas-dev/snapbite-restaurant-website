const menuItems = require('../data/menuData');

const requiredFields = ['name', 'category', 'price', 'description'];

function getMenuItemId(request, response) {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id < 1) {
    response.status(400).json({ success: false, error: 'Menu ID must be a positive integer' });
    return null;
  }

  return id;
}

function validateMenuItem(item) {
  const missingFields = requiredFields.filter((field) => {
    return item[field] === undefined || item[field] === null || item[field] === '';
  });

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(', ')}`;
  }

  if (typeof item.name !== 'string' || typeof item.category !== 'string' || typeof item.description !== 'string') {
    return 'Name, category, and description must be strings';
  }

  if (typeof item.price !== 'number' || !Number.isFinite(item.price) || item.price < 0) {
    return 'Price must be a non-negative number';
  }

  return null;
}

function getAllMenuItems(request, response) {
  response.status(200).json({ success: true, data: menuItems });
}

function getMenuItemById(request, response) {
  const id = getMenuItemId(request, response);
  if (id === null) return;

  const menuItem = menuItems.find((item) => item.id === id);

  if (!menuItem) {
    response.status(404).json({ success: false, error: 'Menu item not found' });
    return;
  }

  response.status(200).json({ success: true, data: menuItem });
}

function createMenuItem(request, response) {
  const validationError = validateMenuItem(request.body);

  if (validationError) {
    response.status(400).json({ success: false, error: validationError });
    return;
  }

  const nextId = menuItems.length > 0 ? Math.max(...menuItems.map((item) => item.id)) + 1 : 1;
  const newMenuItem = {
    id: nextId,
    name: request.body.name.trim(),
    category: request.body.category.trim(),
    price: request.body.price,
    description: request.body.description.trim(),
    image: request.body.image || '',
  };

  menuItems.push(newMenuItem);
  response.status(201).json({ success: true, data: newMenuItem });
}

function updateMenuItem(request, response) {
  const id = getMenuItemId(request, response);
  if (id === null) return;

  const menuItemIndex = menuItems.findIndex((item) => item.id === id);

  if (menuItemIndex === -1) {
    response.status(404).json({ success: false, error: 'Menu item not found' });
    return;
  }

  const validationError = validateMenuItem(request.body);

  if (validationError) {
    response.status(400).json({ success: false, error: validationError });
    return;
  }

  const updatedMenuItem = {
    id,
    name: request.body.name.trim(),
    category: request.body.category.trim(),
    price: request.body.price,
    description: request.body.description.trim(),
    image: request.body.image || '',
  };

  menuItems[menuItemIndex] = updatedMenuItem;
  response.status(200).json({ success: true, data: updatedMenuItem });
}

function deleteMenuItem(request, response) {
  const id = getMenuItemId(request, response);
  if (id === null) return;

  const menuItemIndex = menuItems.findIndex((item) => item.id === id);

  if (menuItemIndex === -1) {
    response.status(404).json({ success: false, error: 'Menu item not found' });
    return;
  }

  const deletedMenuItem = menuItems.splice(menuItemIndex, 1)[0];
  response.status(200).json({ success: true, data: deletedMenuItem });
}

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
