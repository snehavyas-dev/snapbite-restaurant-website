import { apiUrl } from './api.js';

export function loadOwnerDashboard() {
  const content = document.getElementById('content');
  content.innerHTML = '';

  const section = document.createElement('section');
  section.classList.add('owner-dashboard');
  const heading = document.createElement('h2');
  heading.textContent = 'Reservation Dashboard';
  section.appendChild(heading);

  const status = document.createElement('p');
  status.classList.add('owner-status');
  status.setAttribute('role', 'status');
  section.appendChild(status);

  const reservations = document.createElement('div');
  reservations.classList.add('reservation-list');
  section.appendChild(reservations);

  const form = document.createElement('form');
  form.classList.add('owner-login');
  const password = document.createElement('input');
  password.type = 'password';
  password.name = 'password';
  password.placeholder = 'Owner password';
  password.autocomplete = 'current-password';
  password.required = true;
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.classList.add('btn-submit');
  submit.textContent = 'View reservations';
  form.append(password, submit);
  section.appendChild(form);

  const logout = document.createElement('button');
  logout.type = 'button';
  logout.classList.add('owner-logout');
  logout.textContent = 'Log out';
  logout.hidden = true;
  logout.addEventListener('click', () => {
    window.sessionStorage.removeItem('snapbite-owner-password');
    reservations.replaceChildren();
    status.textContent = 'You have been logged out.';
    password.value = '';
    logout.hidden = true;
  });
  section.appendChild(logout);

  const loadReservations = async (ownerPassword) => {
    status.textContent = 'Loading reservations...';
    reservations.replaceChildren();
    const response = await fetch(apiUrl('/api/reservations'), {
      headers: { Authorization: `Bearer ${ownerPassword}` },
    });
    const result = await response.json();

    if (!response.ok) {
      window.sessionStorage.removeItem('snapbite-owner-password');
      throw new Error(result.error || 'Unable to load reservations.');
    }

    if (result.data.length === 0) {
      status.textContent = 'No reservations have been submitted yet.';
      return;
    }

    status.textContent = `${result.data.length} reservation(s)`;
    result.data.forEach((reservation) => {
      const card = document.createElement('article');
      card.classList.add('reservation-card');
      const title = document.createElement('h3');
      title.textContent = `${reservation.name} - ${reservation.guests} guest(s)`;
      const details = document.createElement('p');
      details.textContent = `${reservation.date} at ${reservation.time} | ${reservation.email} | ${reservation.phone}`;
      card.append(title, details);

      if (reservation.message) {
        const message = document.createElement('p');
        message.textContent = `Special requests: ${reservation.message}`;
        card.appendChild(message);
      }

      reservations.appendChild(card);
    });
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submit.disabled = true;

    try {
      const ownerPassword = password.value;
      await loadReservations(ownerPassword);
      window.sessionStorage.setItem('snapbite-owner-password', ownerPassword);
      logout.hidden = false;
    } catch (error) {
      status.textContent = error.message || 'Unable to load reservations.';
    } finally {
      submit.disabled = false;
    }
  });

  const savedPassword = window.sessionStorage.getItem('snapbite-owner-password');
  if (savedPassword) {
    password.value = savedPassword;
    loadReservations(savedPassword)
      .then(() => { logout.hidden = false; })
      .catch((error) => { status.textContent = error.message; });
  }

  content.appendChild(section);
}
