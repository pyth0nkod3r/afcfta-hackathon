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
      
      // Collect all form data
      const formData = collectFormData(registrationForm);
      
      // Send data to API
      fetch('https://gfa-tech.com/afcfta-api/api/hackathon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
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

// Function to collect all form data
function collectFormData(form) {
  // Create an object to store all form data
  const formData = {
    teamInfo: {},
    teamLeader: {},
    teamMembers: [],
    projectIdea: {},
    technicalDetails: {},
    participationDetails: {},
    declaration: {}
  };
  
  // Team Information
  formData.teamInfo = {
    teamName: form.querySelector('input[type="text"]').value,
    teamSize: form.querySelector('#teamSize').value
  };
  
  // Team Leader Information
  const leaderSection = form.querySelectorAll('.section')[1];
  console.log(leaderSection)
  formData.teamLeader = {
    fullName: leaderSection.querySelector('input[type="text"]').value,
    email: leaderSection.querySelector('input[type="email"]').value,
    phone: leaderSection.querySelector('input[type="tel"]').value,
    linkedin: leaderSection.querySelector('input[type="url"]').value,
    country: leaderSection.querySelector('select[name="country"]').value,
    nationality: leaderSection.querySelector('select[name="nationality"]').value,
    age: leaderSection.querySelector('input[type="number"]').value,
    gender: leaderSection.querySelectorAll('select')[2].value
  };
  
  // Team Members
  const teamMembersContainer = document.getElementById('teamMembersContainer');
  const memberSections = teamMembersContainer.querySelectorAll('.member-section');
  
  memberSections.forEach((section, index) => {
    const member = {
      fullName: section.querySelector('input[name^="member"][name$="Name"]').value,
      email: section.querySelector('input[name^="member"][name$="Email"]').value,
      phone: section.querySelector('input[name^="member"][name$="Phone"]').value,
      role: section.querySelector('input[name^="member"][name$="Role"]').value,
      country: section.querySelector('input[name^="member"][name$="Country"]').value,
      linkedin: section.querySelector('input[name^="member"][name$="LinkedIn"]').value,
      nationality: section.querySelector('input[name^="member"][name$="Nationality"]').value,
      age: section.querySelector('input[name^="member"][name$="Age"]').value,
      gender: section.querySelector('select[name^="member"][name$="Gender"]').value
    };
    
    formData.teamMembers.push(member);
  });
  
  // Project Idea
  const ideaSection = form.querySelectorAll('.section')[3];
  const challengeAreas = [];
  ideaSection.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.checked) {
      challengeAreas.push(checkbox.parentElement.textContent.trim());
    }
  });
  
  formData.projectIdea = {
    title: ideaSection.querySelector('input[type="text"]').value,
    challengeAreas: challengeAreas,
    summary: ideaSection.querySelectorAll('textarea')[0].value,
    problem: ideaSection.querySelectorAll('textarea')[1].value,
    technology: ideaSection.querySelector('input[placeholder="e.g., AI, Blockchain, APIs"]').value,
    alignment: ideaSection.querySelectorAll('textarea')[2].value
  };
  
  // Technical Details
  const technicalSection = form.querySelectorAll('.section')[4];
  formData.technicalDetails = {
    hasPrototype: technicalSection.querySelector('select').value,
    prototypeLink: technicalSection.querySelector('input[type="url"]').value,
    // Note: File uploads require special handling, not included in this basic implementation
    repositoryLink: technicalSection.querySelectorAll('input[type="url"]')[1].value
  };
  
  // Participation Details
  const participationSection = form.querySelectorAll('.section')[5];
  formData.participationDetails = {
    heardFrom: participationSection.querySelectorAll('select')[0].value,
    previousHackathon: participationSection.querySelectorAll('select')[1].value,
    previousHackathonDetails: participationSection.querySelector('input[type="text"]').value,
    fullyAvailable: participationSection.querySelectorAll('select')[2].value
  };
  
  // Declaration & Consent
  const declarationSection = form.querySelectorAll('.section')[6];
  const checkboxes = declarationSection.querySelectorAll('input[type="checkbox"]');
  formData.declaration = {
    africanOrigin: checkboxes[0].checked,
    termsAgreed: checkboxes[1].checked,
    consentToUpdates: checkboxes[2].checked,
    privacyPolicyAgreed: checkboxes[3].checked
  };
  
  return formData;
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