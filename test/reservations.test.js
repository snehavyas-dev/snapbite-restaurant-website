const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { after, before, test } = require('node:test');

const databaseDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'snapbite-reservations-'));
process.env.DATABASE_PATH = path.join(databaseDirectory, 'reservations.sqlite');
process.env.OWNER_PASSWORD = 'test-owner-password';

const app = require('../server/server');
const { closeDatabase } = require('../server/data/reservationStore');
let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  closeDatabase();
  fs.rmSync(databaseDirectory, { recursive: true, force: true });
});

test('reservation submissions are validated, persisted, and private to the owner', async () => {
  const invalidResponse = await fetch(`${baseUrl}/api/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Incomplete' }),
  });
  assert.equal(invalidResponse.status, 400);

  const honeyResponse = await fetch(`${baseUrl}/api/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Spam Bot',
      email: 'spam@example.com',
      phone: '+91 98765 43210',
      date: '2099-01-02',
      time: '18:30',
      guests: 2,
      _honey: 'spam value',
    }),
  });
  assert.equal(honeyResponse.status, 400);

  const privateResponse = await fetch(`${baseUrl}/api/reservations`);
  assert.equal(privateResponse.status, 401);

  const createResponse = await fetch(`${baseUrl}/api/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      phone: '+91 98765 43210',
      date: '2099-01-02',
      time: '18:30',
      guests: 3,
      message: 'Window seat, please',
    }),
  });
  assert.equal(createResponse.status, 201);

  const createResult = await createResponse.json();
  assert.equal(createResult.data.name, 'Ada Lovelace');

  const listResponse = await fetch(`${baseUrl}/api/reservations`, {
    headers: { Authorization: 'Bearer test-owner-password' },
  });
  assert.equal(listResponse.status, 200);
  const listResult = await listResponse.json();
  assert.equal(listResult.data.length, 1);
  assert.equal(listResult.data[0].message, 'Window seat, please');
});
