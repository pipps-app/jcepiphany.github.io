document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const formMessage = document.querySelector('.form-message');

  form.addEventListener('submit', function(e) {
    // Prevent the default form submission (page refresh)
    e.preventDefault();

    // Get the data from the form
    const formData = new FormData(form);
    
    // Display a "Sending..." message for better feedback
    formMessage.textContent = "Sending...";
    formMessage.style.color = "#333";

    // Use the Fetch API to submit the form data asynchronously
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      // Check if the submission was successful
      if (response.ok) {
        formMessage.textContent = "Thank you! Your message has been sent.";
        formMessage.style.color = "#25d366"; // Green for success
        form.reset(); // Clear the form fields
      } else {
        // Handle server-side errors (e.g., Formspree issues)
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            formMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
          } else {
            formMessage.textContent = "Oops! There was a problem submitting your form.";
          }
          formMessage.style.color = "#ff0000"; // Red for error
        })
      }
    }).catch(error => {
      // Handle network errors (e.g., no internet connection)
      formMessage.textContent = "Oops! There was a problem submitting your form.";
      formMessage.style.color = "#ff0000"; // Red for error
    });

    // Optional: Hide the message after a few seconds
    setTimeout(() => {
        formMessage.textContent = "";
    }, 6000);
  });
});
