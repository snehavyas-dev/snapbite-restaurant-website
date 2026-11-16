const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const databasePath = path.resolve(
  process.env.DATABASE_PATH || path.join(__dirname, 'reservations.sqlite'),
);

fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const database = new DatabaseSync(databasePath);

database.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    message TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL
  )
`);

const insertReservation = database.prepare(`
  INSERT INTO reservations (name, email, phone, date, time, guests, message, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);
const selectReservations = database.prepare(`
  SELECT id, name, email, phone, date, time, guests, message, created_at
  FROM reservations
  ORDER BY created_at DESC, id DESC
`);

function createReservation(reservation) {
  const createdAt = new Date().toISOString();
  const result = insertReservation.run(
    reservation.name,
    reservation.email,
    reservation.phone,
    reservation.date,
    reservation.time,
    reservation.guests,
    reservation.message,
    createdAt,
  );

  return {
    id: Number(result.lastInsertRowid),
    ...reservation,
    created_at: createdAt,
  };
}

function getReservations() {
  return selectReservations.all();
}

function closeDatabase() {
  database.close();
}

module.exports = { createReservation, getReservations, closeDatabase };
