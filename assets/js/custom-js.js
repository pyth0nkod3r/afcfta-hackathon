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

