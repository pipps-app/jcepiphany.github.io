// Optional: For confirmation message after submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const message = document.querySelector('.form-message');

  form.addEventListener('submit', function() {
    message.textContent = "Thank you! Your message has been sent.";
    message.style.color = "green";
  });
});