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
          // Check for numeric characters only
          const hasNonNumeric = /[^\d\+\-\s]/.test(input.value);

          // Get clean number without formatting characters
          const cleanNumber = iti.getNumber().replace(/[\+\-\s]/g, "");

          // Check if valid and meets minimum length of 10 digits
          if (
            iti.isValidNumber() &&
            !hasNonNumeric &&
            cleanNumber.length >= 10
          ) {
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

              if (hasNonNumeric) {
                msg.textContent = "Phone number should contain only digits";
              } else if (cleanNumber.length < 10) {
                msg.textContent = "Phone number must be at least 10 digits";
              } else {
                msg.textContent = "Please enter a valid phone number";
              }

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
      console.error("Error initializing phone input:", error.message);
    }
  });

  // Handle registration form
  const registrationForm = document.getElementById("registration-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
      // Explicitly prevent default form submission
      event.preventDefault();
      console.log("Registration form submission started");

      const status = registrationForm.querySelector(".status");
      if (!status) {
        console.error("Status element not found in registration form");
        return;
      }

      // Check for any validation errors in the form before proceeding
      const errorElements = registrationForm.querySelectorAll(".error");
      const errorMessages = registrationForm.querySelectorAll(".phone-error");

      if (errorElements.length > 0 || errorMessages.length > 0) {
        status.style.color = "red";
        status.textContent =
          "Please fix the errors in the form before submitting";
        return;
      }

      // Get the phone input directly from the form
      const phoneInputElement = registrationForm.querySelector(
        'input[name="phone"]'
      );
      let phoneInput = null;

      // Find the corresponding phoneUtils instance for this specific input element
      for (let i = 0; i < phoneInputs.length; i++) {
        if (phoneInputs[i] === phoneInputElement) {
          phoneInput = phoneUtils[i];
          break;
        }
      }

      // Check if we found the phone input and if it's valid
      if (!phoneInput) {
        console.error("Could not find phone input util for registration form");
        status.style.color = "red";
        status.textContent =
          "Error with phone validation. Please contact support.";
        return;
      }

      // Registration form phone validation
      const rawPhoneNumber = phoneInputElement.value.trim();
      if (rawPhoneNumber === "") {
        status.style.color = "red";
        status.textContent = "Please enter a phone number";
        return;
      }

      // Validate phone number
      const hasNonNumeric = /[^\d\+\-\s]/.test(rawPhoneNumber);
      const cleanNumber = phoneInput.getNumber().replace(/[\+\-\s]/g, "");

      if (hasNonNumeric) {
        status.style.color = "red";
        status.textContent = "Phone number should contain only digits";
        return;
      }

      if (cleanNumber.length < 10) {
        status.style.color = "red";
        status.textContent = "Phone number must be at least 10 digits";
        return;
      }

      // Include country code if not present
      let phoneNumber = rawPhoneNumber;
      if (!phoneNumber.startsWith("+")) {
        // Try to get the phone number with country code from the library
        try {
          phoneNumber = phoneInput.getNumber();
        } catch (err) {
          console.warn("Could not format phone number, using raw input", err);
          // If Nigerian number without country code, add it
          if (
            phoneNumber.length === 10 ||
            (phoneNumber.length === 11 && phoneNumber.startsWith("0"))
          ) {
            phoneNumber = "+234" + phoneNumber.replace(/^0/, "");
          }
        }
      }

      // Get message from message field
      const messageField = registrationForm.querySelector("[name='message']");

      const formData = {
        firstName: registrationForm.querySelector("input[name='firstName']")
          .value,
        lastName: registrationForm.querySelector("[name='lastName']").value,
        emailAddress: registrationForm.querySelector("[name='email']").value,
        phoneNumber: phoneNumber,
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
              let errorMessage = "Registration failed";
              try {
                const errorData = JSON.parse(text);
                if (
                  errorData.messages &&
                  typeof errorData.messages === "object"
                ) {
                  // Format error messages to display only the values from messages object
                  errorMessage = Object.values(errorData.messages).join("\n");
                }
              } catch (parseError) {
                errorMessage = text || "Registration failed";
              }
              // Create a custom error object with just the formatted message
              const error = new Error(errorMessage);
              // Reject the promise with this error
              return Promise.reject(error);
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
          // Display the clean error message
          status.textContent = error.message;
          console.error("Form submission error:", error.message);
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

      // Check for any validation errors in the form before proceeding
      const errorElements = contactForm.querySelectorAll(".error");
      const errorMessages = contactForm.querySelectorAll(".phone-error");

      if (errorElements.length > 0 || errorMessages.length > 0) {
        status.style.color = "red";
        status.textContent =
          "Please fix the errors in the form before submitting";
        return;
      }

      // Get the phone input directly from the form
      const phoneInputElement = contactForm.querySelector(
        'input[name="phone"]'
      );
      let phoneInput = null;

      // Find the corresponding phoneUtils instance for this specific input element
      for (let i = 0; i < phoneInputs.length; i++) {
        if (phoneInputs[i] === phoneInputElement) {
          phoneInput = phoneUtils[i];
          break;
        }
      }

      // Check if we found the phone input and if it's valid
      if (!phoneInput) {
        console.error("Could not find phone input util for contact form");
        status.style.color = "red";
        status.textContent =
          "Error with phone validation. Please contact support.";
        return;
      }

      // Contact form phone validation
      const rawPhoneNumber = phoneInputElement.value.trim();
      if (rawPhoneNumber === "") {
        status.style.color = "red";
        status.textContent = "Please enter a phone number";
        return;
      }

      // Validate phone number
      const hasNonNumeric = /[^\d\+\-\s]/.test(rawPhoneNumber);
      const cleanNumber = phoneInput.getNumber().replace(/[\+\-\s]/g, "");

      if (hasNonNumeric) {
        status.style.color = "red";
        status.textContent = "Phone number should contain only digits";
        return;
      }

      if (cleanNumber.length < 10) {
        status.style.color = "red";
        status.textContent = "Phone number must be at least 10 digits";
        return;
      }

      // Include country code if not present
      let phoneNumber = rawPhoneNumber;
      if (!phoneNumber.startsWith("+")) {
        // Try to get the phone number with country code from the library
        try {
          phoneNumber = phoneInput.getNumber();
        } catch (err) {
          console.warn("Could not format phone number, using raw input", err);
          // If Nigerian number without country code, add it
          if (
            phoneNumber.length === 10 ||
            (phoneNumber.length === 11 && phoneNumber.startsWith("0"))
          ) {
            phoneNumber = "+234" + phoneNumber.replace(/^0/, "");
          }
        }
      }

      const formData = {
        fullName: contactForm.querySelector("[name='name']").value,
        emailAddress: contactForm.querySelector("[name='email']").value,
        phoneNumber: phoneNumber,
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
              let errorMessage = "Message sending failed";
              try {
                const errorData = JSON.parse(text);
                if (
                  errorData.messages &&
                  typeof errorData.messages === "object"
                ) {
                  // Format error messages to display only the values from messages object
                  errorMessage = Object.values(errorData.messages).join("\n");
                }
              } catch (parseError) {
                errorMessage = text || "Message sending failed";
              }
              // Create a custom error object with just the formatted message
              const error = new Error(errorMessage);
              // Reject the promise with this error
              return Promise.reject(error);
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
          // Display the clean error message
          status.textContent = error.message;
          console.error("Form submission error:", error.message);
        });
    });
  }
});

// Registration Form
      function generateTeamMembers() {
        const container = document.getElementById("teamMembersContainer");
        container.innerHTML = "";
        const count = parseInt(document.getElementById("teamSize").value);
        for (let i = 1; i < count; i++) {
          const section = document.createElement("div");
          section.classList.add("member-section");
          section.innerHTML = ` <h4>Team Member ${i}</h4> <label>Full Name</label> <input type="text" name="member${i}Name" /> <label>Email Address</label> <input type="email" name="member${i}Email" /> <label>Phone Number</label> <input type="tel" name="member${i}Phone" /> <label>Role in Team</label> <input type="text" name="member${i}Role" /> <label>Country of Residence</label> <input type="text" name="member${i}Country" /> <label>LinkedIn Profile (Optional)</label> <input type="url" name="member${i}LinkedIn" /> <label>Nationality</label> <input type="text" name="member${i}Nationality" /> <label>Age</label> <input type="number" min="18" name="member${i}Age" /> <label>Gender (Optional)</label> <select name="member${i}Gender"> <option value="">Select</option> <option>Male</option> <option>Female</option> <option>Prefer not to say</option> </select> `;
          container.appendChild(section);
        }
      }
