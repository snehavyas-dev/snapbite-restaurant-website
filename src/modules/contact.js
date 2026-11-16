/**
 * Contact Page Module
 * 
 * Generates the contact/reservation page with:
 * - Restaurant contact information
 * - Opening hours
 * - Reservation form
 */

export function loadContact() {
  // Get the content container
  const content = document.getElementById('content');
  
  // Clear any existing content
  content.innerHTML = '';

  // Create the contact section
  const contactSection = document.createElement('section');
  contactSection.classList.add('reserve');

  // Create heading
  const heading = document.createElement('h2');
  heading.textContent = 'Contact Us & Reserve';
  contactSection.appendChild(heading);

  // Create contact information container
  const contactInfo = document.createElement('div');
  contactInfo.classList.add('contact-info');

  // Add address
  const addressDiv = document.createElement('div');
  const addressLabel = document.createElement('strong');
  addressLabel.textContent = 'Address: ';
  const addressText = document.createTextNode('123 Food Street, Flavor City, FC 12345');
  addressDiv.appendChild(addressLabel);
  addressDiv.appendChild(addressText);
  contactInfo.appendChild(addressDiv);

  // Add phone
  const phoneDiv = document.createElement('div');
  const phoneLabel = document.createElement('strong');
  phoneLabel.textContent = 'Phone: ';
  const phoneText = document.createTextNode('+1 (555) 123-4567');
  phoneDiv.appendChild(phoneLabel);
  phoneDiv.appendChild(phoneText);
  contactInfo.appendChild(phoneDiv);

  // Add email
  const emailDiv = document.createElement('div');
  const emailLabel = document.createElement('strong');
  emailLabel.textContent = 'Email: ';
  const emailText = document.createTextNode('hello@snapbite.com');
  emailDiv.appendChild(emailLabel);
  emailDiv.appendChild(emailText);
  contactInfo.appendChild(emailDiv);

  // Add opening hours
  const hoursDiv = document.createElement('div');
  const hoursLabel = document.createElement('strong');
  hoursLabel.textContent = 'Hours: ';
  const hoursText = document.createTextNode('Mon-Sun 10:00 AM - 11:00 PM');
  hoursDiv.appendChild(hoursLabel);
  hoursDiv.appendChild(hoursText);
  contactInfo.appendChild(hoursDiv);

  contactSection.appendChild(contactInfo);

  // Create reservation form
  const form = document.createElement('form');
  form.classList.add('reserve-form');
  form.method = 'POST';
  form.action = 'https://formsubmit.co/snehavyas250@gmail.com';

  const addHiddenField = (name, value) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  addHiddenField('_subject', 'New SnapBite reservation request');
  addHiddenField(
    '_autoresponse',
    'Thanks for your reservation request at SnapBite. We received it and will contact you to confirm availability. This email is not a booking confirmation.',
  );
  addHiddenField('_next', 'https://snehavyas-dev.github.io/snapbite-restaurant-website/?reservation=submitted');
  addHiddenField('_template', 'table');

  // Create name input
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Your Name';
  nameInput.name = 'name';
  nameInput.autocomplete = 'name';
  nameInput.maxLength = 100;
  nameInput.required = true;
  form.appendChild(nameInput);

  // Create email input
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Your Email';
  emailInput.name = 'email';
  emailInput.autocomplete = 'email';
  emailInput.required = true;
  form.appendChild(emailInput);

  const replyToInput = document.createElement('input');
  replyToInput.type = 'hidden';
  replyToInput.name = '_replyto';
  form.appendChild(replyToInput);

  // Create phone input
  const phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.placeholder = 'Your Phone';
  phoneInput.name = 'phone';
  phoneInput.autocomplete = 'tel';
  phoneInput.required = true;
  form.appendChild(phoneInput);

  // Create date input
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.name = 'date';
  dateInput.min = new Date().toISOString().slice(0, 10);
  dateInput.required = true;
  form.appendChild(dateInput);

  // Create time input
  const timeInput = document.createElement('input');
  timeInput.type = 'time';
  timeInput.name = 'time';
  timeInput.required = true;
  form.appendChild(timeInput);

  // Create guests input
  const guestsInput = document.createElement('input');
  guestsInput.type = 'number';
  guestsInput.placeholder = 'Number of Guests';
  guestsInput.name = 'guests';
  guestsInput.min = '1';
  guestsInput.max = '20';
  guestsInput.required = true;
  form.appendChild(guestsInput);

  // Create message textarea
  const messageTextarea = document.createElement('textarea');
  messageTextarea.placeholder = 'Special requests (optional)';
  messageTextarea.name = 'message';
  messageTextarea.maxLength = 1000;
  messageTextarea.rows = '4';
  form.appendChild(messageTextarea);

  // Create submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.classList.add('btn-submit');
  submitBtn.textContent = 'Reserve Table';
  form.appendChild(submitBtn);

  form.addEventListener('submit', () => {
    replyToInput.value = emailInput.value;
  });

  contactSection.appendChild(form);

  // Add the contact section to content
  content.appendChild(contactSection);
}
