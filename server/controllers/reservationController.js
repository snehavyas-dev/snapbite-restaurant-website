const { timingSafeEqual } = require('crypto');
const { createReservation, getReservations } = require('../data/reservationStore');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s().-]{7,25}$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

function validateReservation(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Reservation details are required';
  }

  const { name, email, phone, date, time, guests, message = '' } = body;

  if ([name, email, phone, date, time].some((value) => typeof value !== 'string' || !value.trim())) {
    return 'Name, email, phone, date, and time are required';
  }

  if (typeof guests !== 'number' || !Number.isInteger(guests) || guests < 1 || guests > 20) {
    return 'Guests must be a whole number between 1 and 20';
  }

  if (typeof message !== 'string') {
    return 'Special requests must be text';
  }

  if (name.trim().length > 100 || email.trim().length > 254 || phone.trim().length > 30 || message.length > 1000) {
    return 'One or more fields exceed the allowed length';
  }

  if (!emailPattern.test(email.trim())) {
    return 'Enter a valid email address';
  }

  if (!phonePattern.test(phone.trim())) {
    return 'Enter a valid phone number';
  }

  const parsedDate = datePattern.test(date) ? new Date(`${date}T00:00:00Z`) : null;
  if (!parsedDate || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
    return 'Enter a valid reservation date';
  }

  if (!timePattern.test(time)) {
    return 'Enter a valid reservation time';
  }

  return null;
}

function submitReservation(request, response, next) {
  const validationError = validateReservation(request.body);

  if (validationError) {
    response.status(400).json({ success: false, error: validationError });
    return;
  }

  try {
    const reservation = {
      name: request.body.name.trim(),
      email: request.body.email.trim(),
      phone: request.body.phone.trim(),
      date: request.body.date,
      time: request.body.time,
      guests: request.body.guests,
      message: request.body.message.trim(),
    };

    response.status(201).json({ success: true, data: createReservation(reservation) });
  } catch (error) {
    next(error);
  }
}

function requireOwner(request, response, next) {
  const ownerPassword = process.env.OWNER_PASSWORD;

  if (!ownerPassword) {
    response.status(503).json({ success: false, error: 'Owner access is not configured' });
    return;
  }

  const authorization = request.get('Authorization') || '';
  const suppliedPassword = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : '';
  const suppliedBuffer = Buffer.from(suppliedPassword);
  const expectedBuffer = Buffer.from(ownerPassword);

  if (suppliedBuffer.length !== expectedBuffer.length || !timingSafeEqual(suppliedBuffer, expectedBuffer)) {
    response.status(401).json({ success: false, error: 'Owner password is incorrect' });
    return;
  }

  next();
}

function listReservations(request, response, next) {
  try {
    response.status(200).json({ success: true, data: getReservations() });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitReservation, requireOwner, listReservations };
