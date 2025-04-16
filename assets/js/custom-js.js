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

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  // Get the registration form
  const registrationForm = document.getElementById('registrationForm');
  
  if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitButton = registrationForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;
      
      // Create FormData object instead of JSON
      const formData = new FormData();
      
      // Add form fields to FormData
      addFormFieldsToFormData(registrationForm, formData);
      
      // For file uploads
      const fileInput = registrationForm.querySelector('input[type="file"]');
      if (fileInput && fileInput.files.length > 0) {
        formData.append('fileUpload', fileInput.files[0]);
      }
      
      // Create a proxy endpoint on your server to handle the API request
      // This is the recommended approach to avoid exposing credentials in client-side code
      fetch('/api/submit-hackathon', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Show success message
        showNotification('Success', 'Your application has been submitted successfully!', 'success');
        
        // Reset form
        registrationForm.reset();
        
        // Reset team members container
        document.getElementById('teamMembersContainer').innerHTML = '';
        
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      })
      .catch(error => {
        console.error('Error:', error);
        
        // Show error message
        showNotification('Error', 'There was a problem submitting your application. Please try again.', 'error');
        
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
    });
  }
});

// Function to add form fields to FormData
function addFormFieldsToFormData(form, formData) {
  // Team Info
  formData.append('teamName', form.querySelector('.section:nth-child(1) input[type="text"]').value);
  formData.append('teamSize', form.querySelector('#teamSize').value);
  
  // Team Leader
  const leaderSection = form.querySelectorAll('.section')[1];
  formData.append('teamLeaderFullName', leaderSection.querySelector('input[type="text"]').value);
  formData.append('teamLeaderEmail', leaderSection.querySelector('input[type="email"]').value);
  formData.append('teamLeaderPhone', leaderSection.querySelector('input[type="tel"]').value);
  formData.append('teamLeaderLinkedIn', leaderSection.querySelector('input[type="url"]').value || "");
  formData.append('teamLeaderCountry', leaderSection.querySelector('select[name="country"]').value);
  formData.append('teamLeaderNationality', leaderSection.querySelector('select[name="nationality"]').value);
  formData.append('teamLeaderAge', leaderSection.querySelector('input[type="number"]').value);
  formData.append('teamLeaderGender', leaderSection.querySelectorAll('select')[2].value);
  
  // Team Members
  const teamMembersContainer = document.getElementById('teamMembersContainer');
  const memberSections = teamMembersContainer.querySelectorAll('.member-section');
  
  memberSections.forEach((section, index) => {
    formData.append(`teamMembers[${index}][teamMemberFullName]`, section.querySelector('input[name^="member"][name$="Name"]').value);
    formData.append(`teamMembers[${index}][teamMemberEmail]`, section.querySelector('input[name^="member"][name$="Email"]').value);
    formData.append(`teamMembers[${index}][teamMemberPhone]`, section.querySelector('input[name^="member"][name$="Phone"]').value);
    formData.append(`teamMembers[${index}][teamMemberRole]`, section.querySelector('input[name^="member"][name$="Role"]').value);
    formData.append(`teamMembers[${index}][teamMemberCountry]`, section.querySelector('input[name^="member"][name$="Country"]').value);
    formData.append(`teamMembers[${index}][teamMemberLinkedIn]`, section.querySelector('input[name^="member"][name$="LinkedIn"]')?.value || "");
    formData.append(`teamMembers[${index}][teamMemberNationality]`, section.querySelector('input[name^="member"][name$="Nationality"]').value);
    formData.append(`teamMembers[${index}][teamMemberAge]`, section.querySelector('input[name^="member"][name$="Age"]').value);
    formData.append(`teamMembers[${index}][teamMemberGender]`, section.querySelector('select[name^="member"][name$="Gender"]').value);
  });
  
  // Project Details
  const ideaSection = form.querySelectorAll('.section')[3];
  formData.append('projectTitle', ideaSection.querySelector('input[type="text"]').value);
  
  // Challenge Areas
  const challengeCheckboxes = ideaSection.querySelectorAll('.checkbox-group input[type="checkbox"]');
  let challengeIndex = 0;
  challengeCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      formData.append(`challengeAreas[${challengeIndex}]`, checkbox.parentElement.textContent.trim());
      challengeIndex++;
    }
  });
  
  formData.append('ideaSummary', ideaSection.querySelectorAll('textarea')[0].value);
  formData.append('problemSolving', ideaSection.querySelectorAll('textarea')[1].value);
  formData.append('technology', ideaSection.querySelector('input[placeholder="e.g., AI, Blockchain, APIs"]').value);
  formData.append('alignment', ideaSection.querySelectorAll('textarea')[2].value);
  
  // Technical Details
  const technicalSection = form.querySelectorAll('.section')[4];
  formData.append('hasPrototype', technicalSection.querySelector('select').value);
  formData.append('prototypeURL', technicalSection.querySelector('input[type="url"]').value || "");
  formData.append('projectRepo', technicalSection.querySelectorAll('input[type="url"]')[1]?.value || "");
  
  // Participation Details
  const participationSection = form.querySelectorAll('.section')[5];
  formData.append('heardAbout', participationSection.querySelectorAll('select')[0].value);
  formData.append('hasParticipated', participationSection.querySelectorAll('select')[1].value);
  formData.append('pastHackathons', participationSection.querySelector('input[type="text"]').value || "");
  formData.append('availability', participationSection.querySelectorAll('select')[2].value);
  
  // Declarations
  const declarationSection = form.querySelectorAll('.section')[6];
  const declarations = declarationSection.querySelectorAll('input[type="checkbox"]');
  
  if (declarations[0].checked) {
    formData.append('declarations[0]', "I confirm that all team members are of African origin and at least 18 years old.");
  }
  if (declarations[1].checked) {
    formData.append('declarations[1]', "I agree to the terms and conditions of participation.");
  }
  if (declarations[2].checked) {
    formData.append('declarations[2]', "I consent to receive updates related to the Hackathon via email or phone.");
  }
  if (declarations[3].checked) {
    formData.append('declarations[3]', "I understand that my data will be used in accordance with the privacy policy.");
  }
}

// Function to show notification
function showNotification(title, message, type) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
  notification.style.color = type === 'success' ? '#155724' : '#721c24';
  notification.style.padding = '15px 20px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  notification.style.zIndex = '9999';
  notification.style.maxWidth = '400px';
  
  // Add content
  notification.innerHTML = `
    <h4 style="margin-top: 0; margin-bottom: 5px;">${title}</h4>
    <p style="margin: 0;">${message}</p>
    <button style="position: absolute; top: 5px; right: 5px; background: none; border: none; cursor: pointer; font-size: 16px;">&times;</button>
  `;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Add close button functionality
  const closeButton = notification.querySelector('button');
  closeButton.addEventListener('click', function() {
    document.body.removeChild(notification);
  });
  
  // Auto-remove after 5 seconds
  setTimeout(function() {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 5000);
}