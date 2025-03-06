document.addEventListener("DOMContentLoaded", function () {
  const registrationUrl = "https://gfa-tech.com/afcfta-api/api/registration";
  const contactUrl = "https://gfa-tech.com/afcfta-api/api/contact";

  // Basic Auth credentials
  const username = "admin";
  const password = "secret";
  const basicAuth = "Basic " + btoa(username + ":" + password);

  // Initialize phone inputs
  const phoneInputs = document.querySelectorAll('input[name="phone"]');
  console.log("Found phone inputs:", phoneInputs.length);

  const phoneUtils = [];

  // Phone input configuration
  const phoneConfig = {
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    initialCountry: "ng",
    preferredCountries: ["ng", "gh", "ke", "za"],
    separateDialCode: true,
    nationalMode: false,
    formatOnDisplay: true,
    autoPlaceholder: "aggressive",
  };

  // Initialize each phone input
  phoneInputs.forEach((input, index) => {
    try {
      console.log("Initializing phone input", index);
      const iti = window.intlTelInput(input, phoneConfig);
      phoneUtils.push(iti);

      // Add validation styling
      input.addEventListener("blur", function () {
        const errorMsg = input.parentNode.querySelector(".phone-error");
        if (input.value.trim()) {
          if (iti.isValidNumber()) {
            input.classList.remove("error");
            input.classList.add("valid");
            if (errorMsg) errorMsg.remove();
          } else {
            input.classList.remove("valid");
            input.classList.add("error");
            if (!errorMsg) {
              const msg = document.createElement("div");
              msg.className = "phone-error";
              msg.style.color = "red";
              msg.style.fontSize = "12px";
              msg.style.marginTop = "5px";
              msg.textContent = "Please enter a valid phone number";
              input.parentNode.appendChild(msg);
            }
          }
        }
      });

      // Format as user types
      input.addEventListener("input", function () {
        if (input.value.trim()) {
          const number = iti.getNumber();
          if (number) {
            iti.setNumber(number);
          }
        }
      });
    } catch (error) {
      console.error("Error initializing phone input:", error);
    }
  });

  // Handle registration form
  const registrationForm = document.getElementById("registration-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("Registration form submission started");

      const status = registrationForm.querySelector(".status");
      if (!status) {
        console.error("Status element not found in registration form");
        return;
      }

      const phoneInput = phoneUtils[0];
      if (!phoneInput || !phoneInput.isValidNumber()) {
        status.style.color = "red";
        status.textContent = "Please enter a valid phone number";
        return;
      }

      // Get message from either motivation field or message field (whichever exists)
      const messageField = registrationForm.querySelector("[name='message']");

      const formData = {
        firstName: registrationForm.querySelector("input[name='firstName']")
          .value,
        lastName: registrationForm.querySelector("[name='lastName']").value,
        emailAddress: registrationForm.querySelector("[name='email']").value,
        phoneNumber: phoneInput.getNumber(),
        country: registrationForm.querySelector("[name='country']").value,
        areaOfExpertise:
          registrationForm.querySelector("[name='expertise']").value,
        organization:
          registrationForm.querySelector("[name='organization']").value || null,
        message: messageField ? messageField.value : "",
      };

      console.log("Sending registration data:", formData);

      fetch(registrationUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: basicAuth,
        },
        mode: "cors",
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text || "Registration failed");
            });
          }
          return res.json();
        })
        .then((data) => {
          status.style.color = "green";
          status.textContent = "Registration successful";
          registrationForm.reset();
          phoneInput.setCountry("ng");
          console.log("Success:", data);
        })
        .catch((error) => {
          status.style.color = "red";
          status.textContent = `Error: ${error.message}`;
          console.error("Error:", error);
        });
    });
  }

  // Handle contact form
  const contactForm = document.getElementById("contact-form-api");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      // Explicitly prevent default form submission
      event.preventDefault();
      console.log("Contact form submission started");

      const status = contactForm.querySelector(".status");
      if (!status) {
        console.error("Status element not found in contact form");
        return;
      }

      const phoneInput = phoneUtils[1];
      if (!phoneInput || !phoneInput.isValidNumber()) {
        status.style.color = "red";
        status.textContent = "Please enter a valid phone number";
        return;
      }

      const formData = {
        fullName: contactForm.querySelector("[name='name']").value,
        emailAddress: contactForm.querySelector("[name='email']").value,
        phoneNumber: phoneInput.getNumber(),
        message: contactForm.querySelector("[name='message']").value,
      };

      console.log("Sending contact data:", formData);

      fetch(contactUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: basicAuth,
        },
        mode: "cors",
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text || "Message sending failed");
            });
          }
          return res.json();
        })
        .then((data) => {
          status.style.color = "green";
          status.textContent = "Message sent successfully";
          contactForm.reset();
          phoneInput.setCountry("ng");
          console.log("Success:", data);
        })
        .catch((error) => {
          status.style.color = "red";
          status.textContent = `Error: ${error.message}`;
          console.error("Error:", error);
        });
    });
  }
});
