// Registration Form
function generateTeamMembers() {
  const container = document.getElementById("teamMembersContainer");
  container.innerHTML = "";
  const count = parseInt(document.getElementById("teamSize").value);
  for (let i = 1; i < count; i++) {
    const section = document.createElement("div");
    section.classList.add("member-section");
    section.innerHTML = `
      <h3>Team Member ${i}</h3>
      <label>Full Name *</label>
      <input type="text" name="member${i}Name" required />
      <label>Email Address *</label>
      <input type="email" name="member${i}Email" required />
      <label>Phone Number *</label>
      <input type="tel" name="member${i}Phone" required />
      <label>Role in Team *</label>
      <input type="text" name="member${i}Role" required />
      <label>LinkedIn Profile</label>
      <input type="url" name="member${i}LinkedIn" />
      <label>Country of Residence *</label>
      <select name="member${i}Country" required>
        <option value="">Select Country</option>
        <option value="Afghanistan">Afghanistan</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="Andorra">Andorra</option>
        <option value="Angola">Angola</option>
        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
        <option value="Argentina">Argentina</option>
        <option value="Armenia">Armenia</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Azerbaijan">Azerbaijan</option>
        <option value="Bahamas">Bahamas</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Barbados">Barbados</option>
        <option value="Belarus">Belarus</option>
        <option value="Belgium">Belgium</option>
        <option value="Belize">Belize</option>
        <option value="Benin">Benin</option>
        <option value="Bhutan">Bhutan</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
        <option value="Botswana">Botswana</option>
        <option value="Brazil">Brazil</option>
        <option value="Brunei">Brunei</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Burkina Faso">Burkina Faso</option>
        <option value="Burundi">Burundi</option>
        <option value="Cabo Verde">Cabo Verde</option>
        <option value="Cambodia">Cambodia</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Central African Republic">Central African Republic</option>
        <option value="Chad">Chad</option>
        <option value="Chile">Chile</option>
        <option value="Chinese">Chinese</option>
        <option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option>
        <option value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</option>
        <option value="Congo, Republic of the">Congo, Republic of the</option>
        <option value="Costa Rica">Costa Rica</option>
        <option value="Cote d'Ivoire">Cote d'Ivoire</option>
        <option value="Croatia">Croatia</option>
        <option value="Cuba">Cuba</option>
        <option value="Cyprus">Cyprus</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Djibouti">Djibouti</option>
        <option value="Dominica">Dominica</option>
        <option value="Dominican Republic">Dominican Republic</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Egypt">Egypt</option>
        <option value="El Salvador">El Salvador</option>
        <option value="Equatorial Guinea">Equatorial Guinea</option>
        <option value="Eritrea">Eritrea</option>
        <option value="Estonia">Estonia</option>
        <option value="Eswatini">Eswatini</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Fiji">Fiji</option>
        <option value="Finnish">Finnish</option>
        <option value="French">French</option>
        <option value="Gabon">Gabon</option>
        <option value="Gambia">Gambia</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Ghana">Ghana</option>
        <option value="Greece">Greece</option>
        <option value="Grenada">Grenada</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Guinea">Guinea</option>
        <option value="Guinea-Bissau">Guinea-Bissau</option>
        <option value="Guyana">Guyana</option>
        <option value="Haiti">Haiti</option>
        <option value="Honduras">Honduras</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran">Iran</option>
        <option value="Iraq">Iraq</option>
        <option value="Ireland">Ireland</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy</option>
        <option value="Jamaica">Jamaica</option>
        <option value="Japan">Japan</option>
        <option value="Jordan">Jordan</option>
        <option value="Kazakhstan">Kazakhstan</option>
        <option value="Kenya">Kenya</option>
        <option value="I-Kiribati">I-Kiribati</option>
        <option value="Kosovar">Kosovar</option>
        <option value="Kuwait">Kuwait</option>
        <option value="Kyrgyzstan">Kyrgyzstan</option>
        <option value="Laos">Laos</option>
        <option value="Latvia">Latvia</option>
        <option value="Lebanon">Lebanon</option>
        <option value="Lesotho">Lesotho</option>
        <option value="Liberia">Liberia</option>
        <option value="Libya">Libya</option>
        <option value="Liechtenstein">Liechtenstein</option>
        <option value="Lithuania">Lithuania</option>
        <option value="Luxembourg">Luxembourg</option>
        <option value="Madagascar">Madagascar</option>
        <option value="Malawi">Malawi</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Maldives">Maldives</option>
        <option value="Mali">Mali</option>
        <option value="Malta">Malta</option>
        <option value="Marshall Islands">Marshall Islands</option>
        <option value="Mauritania">Mauritania</option>
        <option value="Mauritian">Mauritian</option>
        <option value="Mexico">Mexico</option>
        <option value="Micronesia">Micronesia</option>
        <option value="Moldova">Moldova</option>
        <option value="Monaco">Monaco</option>
        <option value="Mongolia">Mongolia</option>
        <option value="Montenegro">Montenegro</option>
        <option value="Morocco">Morocco</option>
        <option value="Mozambique">Mozambique</option>
        <option value="Myanmar">Myanmar</option>
        <option value="Namibia">Namibia</option>
        <option value="Nauru">Nauru</option>
        <option value="Nepal">Nepal</option>
        <option value="Netherlands">Netherlands</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Nicaragua">Nicaragua</option>
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="North Korea">North Korea</option>
        <option value="North Macedonia">North Macedonia</option>
        <option value="Norway">Norway</option>
        <option value="Oman">Oman</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Palau">Palau</option>
        <option value="Palestinian">Palestinian</option>
        <option value="Panama">Panama</option>
        <option value="Papua New Guinea">Papua New Guinea</option>
        <option value="Paraguay">Paraguay</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Qatar">Qatar</option>
        <option value="Romania">Romania</option>
        <option value="Russia">Russia</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
        <option value="Saint Lucia">Saint Lucia</option>
        <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
        <option value="Samoa">Samoa</option>
        <option value="San Marino">San Marino</option>
        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Senegal">Senegal</option>
        <option value="Serbia">Serbia</option>
        <option value="Seychelles">Seychelles</option>
        <option value="Sierra Leone">Sierra Leone</option>
        <option value="Singapore">Singapore</option>
        <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
        <option value="Solomon Islands">Solomon Islands</option>
        <option value="Somalia">Somalia</option>
        <option value="South Africa">South Africa</option>
        <option value="South Korea">South Korea</option>
        <option value="South Sudan">South Sudan</option>
        <option value="Spain">Spain</option>
        <option value="Sri Lanka">Sri Lanka</option>
        <option value="Sudan">Sudan</option>
        <option value="Suriname">Suriname</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Syria">Syria</option>
        <option value="Taiwan">Taiwan</option>
        <option value="Tajikistan">Tajikistan</option>
        <option value="Tanzania">Tanzania</option>
        <option value="Thailand">Thailand</option>
        <option value="Timor-Leste">Timor-Leste</option>
        <option value="Togo">Togo</option>
        <option value="Tonga">Tonga</option>
        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
        <option value="Tunisia">Tunisia</option>
        <option value="Turkey">Turkey</option>
        <option value="Turkmenistan">Turkmenistan</option>
        <option value="Tuvalu">Tuvalu</option>
        <option value="Uganda">Uganda</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Arab Emirates">United Arab Emirates</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="Uruguay">Uruguay</option>
        <option value="Uzbekistan">Uzbekistan</option>
        <option value="Vanuatu">Vanuatu</option>
        <option value="Vatican City">Vatican City</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Vietnamese">Vietnamese</option>
        <option value="Yemen">Yemen</option>
        <option value="Zambia">Zambia</option>
        <option value="Zimbabwe">Zimbabwe</option>
      </select>
      <label>Nationality *</label>
      <select name="member${i}Nationality" required>
        <option value="">Select Nationality</option>
        <option value="Afghan">Afghan</option>
        <option value="Albanian">Albanian</option>
        <option value="Algerian">Algerian</option>
        <option value="Andorran">Andorran</option>
        <option value="Angolan">Angolan</option>
        <option value="Antiguan and Barbudan">Antiguan and Barbudan</option>
        <option value="Argentine">Argentine</option>
        <option value="Armenian">Armenian</option>
        <option value="Australian">Australian</option>
        <option value="Austrian">Austrian</option>
        <option value="Azerbaijani">Azerbaijani</option>
        <option value="Bahamian">Bahamian</option>
        <option value="Bahraini">Bahraini</option>
        <option value="Bangladeshi">Bangladeshi</option>
        <option value="Barbadian">Barbadian</option>
        <option value="Belarusian">Belarusian</option>
        <option value="Belgian">Belgian</option>
        <option value="Belizean">Belizean</option>
        <option value="Beninese">Beninese</option>
        <option value="Bhutanese">Bhutanese</option>
        <option value="Bolivian">Bolivian</option>
        <option value="Bosnian and Herzegovinian">Bosnian and Herzegovinian</option>
        <option value="Motswana">Motswana</option>
        <option value="Brazilian">Brazilian</option>
        <option value="Bruneian">Bruneian</option>
        <option value="Bulgarian">Bulgarian</option>
        <option value="Burkinabe">Burkinabe</option>
        <option value="Burundian">Burundian</option>
        <option value="Cape Verdean">Cape Verdean</option>
        <option value="Cambodian">Cambodian</option>
        <option value="Cameroonian">Cameroonian</option>
        <option value="Canadian">Canadian</option>
        <option value="Central African">Central African</option>
        <option value="Chadian">Chadian</option>
        <option value="Chilean">Chilean</option>
        <option value="Chinese">Chinese</option>
        <option value="Colombian">Colombian</option>
        <option value="Comorian">Comorian</option>
        <option value="Congolese">Congolese</option>
        <option value="Costa Rican">Costa Rican</option>
        <option value="Ivorian">Ivorian</option>
        <option value="Croatian">Croatian</option>
        <option value="Cuban">Cuban</option>
        <option value="Cypriot">Cypriot</option>
        <option value="Czech">Czech</option>
        <option value="Danish">Danish</option>
        <option value="Djiboutian">Djiboutian</option>
        <option value="Dominican">Dominican</option>
        <option value="Ecuadorian">Ecuadorian</option>
        <option value="Egyptian">Egyptian</option>
        <option value="Salvadoran">Salvadoran</option>
        <option value="Equatorial Guinean">Equatorial Guinean</option>
        <option value="Eritrean">Eritrean</option>
        <option value="Estonian">Estonian</option>
        <option value="Swazi">Swazi</option>
        <option value="Ethiopian">Ethiopian</option>
        <option value="Fijian">Fijian</option>
        <option value="Finnish">Finnish</option>
        <option value="French">French</option>
        <option value="Gabonese">Gabonese</option>
        <option value="Gambian">Gambian</option>
        <option value="Georgian">Georgian</option>
        <option value="German">German</option>
        <option value="Ghanaian">Ghanaian</option>
        <option value="Greek">Greek</option>
        <option value="Grenadian">Grenadian</option>
        <option value="Guatemalan">Guatemalan</option>
        <option value="Guinean">Guinean</option>
        <option value="Guinea-Bissauan">Guinea-Bissauan</option>
        <option value="Guyanese">Guyanese</option>
        <option value="Haitian">Haitian</option>
        <option value="Honduran">Honduran</option>
        <option value="Hungarian">Hungarian</option>
        <option value="Icelandic">Icelandic</option>
        <option value="Indian">Indian</option>
        <option value="Indonesian">Indonesian</option>
        <option value="Iranian">Iranian</option>
        <option value="Iraqi">Iraqi</option>
        <option value="Irish">Irish</option>
        <option value="Israeli">Israeli</option>
        <option value="Italian">Italian</option>
        <option value="Jamaican">Jamaican</option>
        <option value="Japanese">Japanese</option>
        <option value="Jordanian">Jordanian</option>
        <option value="Kazakhstani">Kazakhstani</option>
        <option value="Kenyan">Kenyan</option>
        <option value="I-Kiribati">I-Kiribati</option>
        <option value="North Korean">North Korean</option>
        <option value="South Korean">South Korean</option>
        <option value="Kosovar">Kosovar</option>
        <option value="Kuwaiti">Kuwaiti</option>
        <option value="Kyrgyzstani">Kyrgyzstani</option>
        <option value="Laotian">Laotian</option>
        <option value="Latvian">Latvian</option>
        <option value="Lebanese">Lebanese</option>
        <option value="Basotho">Basotho</option>
        <option value="Liberian">Liberian</option>
        <option value="Libyan">Libyan</option>
        <option value="Liechtensteiner">Liechtensteiner</option>
        <option value="Lithuanian">Lithuanian</option>
        <option value="Luxembourger">Luxembourger</option>
        <option value="Malagasy">Malagasy</option>
        <option value="Malawian">Malawian</option>
        <option value="Malaysian">Malaysian</option>
        <option value="Maldivian">Maldivian</option>
        <option value="Malian">Malian</option>
        <option value="Maltese">Maltese</option>
        <option value="Marshallese">Marshallese</option>
        <option value="Mauritanian">Mauritanian</option>
        <option value="Mauritian">Mauritian</option>
        <option value="Mexican">Mexican</option>
        <option value="Micronesian">Micronesian</option>
        <option value="Moldovan">Moldovan</option>
        <option value="Monacan">Monacan</option>
        <option value="Mongolian">Mongolian</option>
        <option value="Montenegrin">Montenegrin</option>
        <option value="Moroccan">Moroccan</option>
        <option value="Mozambican">Mozambican</option>
        <option value="Burmese">Burmese</option>
        <option value="Namibian">Namibian</option>
        <option value="Nauruan">Nauruan</option>
        <option value="Nepalese">Nepalese</option>
        <option value="Dutch">Dutch</option>
        <option value="New Zealander">New Zealander</option>
        <option value="Nicaraguan">Nicaraguan</option>
        <option value="Nigerien">Nigerien</option>
        <option value="Nigerian">Nigerian</option>
        <option value="North Macedonian">North Macedonian</option>
        <option value="Norwegian">Norwegian</option>
        <option value="Omani">Omani</option>
        <option value="Pakistani">Pakistani</option>
        <option value="Palauan">Palauan</option>
        <option value="Palestinian">Palestinian</option>
        <option value="Panamanian">Panamanian</option>
        <option value="Papua New Guinean">Papua New Guinean</option>
        <option value="Paraguayan">Paraguayan</option>
        <option value="Peruvian">Peruvian</option>
        <option value="Filipino">Filipino</option>
        <option value="Polish">Polish</option>
        <option value="Portuguese">Portuguese</option>
        <option value="Qatari">Qatari</option>
        <option value="Romanian">Romanian</option>
        <option value="Russian">Russian</option>
        <option value="Rwandan">Rwandan</option>
        <option value="Kittitian and Nevisian">Kittitian and Nevisian</option>
        <option value="Saint Lucian">Saint Lucian</option>
        <option value="Vincentian">Vincentian</option>
        <option value="Samoan">Samoan</option>
        <option value="Sammarinese">Sammarinese</option>
        <option value="Sao Tomean">Sao Tomean</option>
        <option value="Saudi Arabian">Saudi Arabian</option>
        <option value="Senegalese">Senegalese</option>
        <option value="Serbian">Serbian</option>
        <option value="Seychellois">Seychellois</option>
        <option value="Sierra Leonean">Sierra Leonean</option>
        <option value="Singaporean">Singaporean</option>
        <option value="Slovak">Slovak</option>
        <option value="Slovenian">Slovenian</option>
        <option value="Solomon Islander">Solomon Islander</option>
        <option value="Somali">Somali</option>
        <option value="South African">South African</option>
        <option value="South Sudanese">South Sudanese</option>
        <option value="Spain">Spain</option>
        <option value="Sri Lankan">Sri Lankan</option>
        <option value="Sudanese">Sudanese</option>
        <option value="Surinamese">Surinamese</option>
        <option value="Swedish">Swedish</option>
        <option value="Swiss">Swiss</option>
        <option value="Syrian">Syrian</option>
        <option value="Taiwanese">Taiwanese</option>
        <option value="Tajikistani">Tajikistani</option>
        <option value="Tanzanian">Tanzanian</option>
        <option value="Thai">Thai</option>
        <option value="Timorese">Timorese</option>
        <option value="Togolese">Togolese</option>
        <option value="Tongan">Tongan</option>
        <option value="Trinidadian and Tobagonian">Trinidadian and Tobagonian</option>
        <option value="Tunisian">Tunisian</option>
        <option value="Turkish">Turkish</option>
        <option value="Turkmen">Turkmen</option>
        <option value="Tuvaluan">Tuvaluan</option>
        <option value="Ugandan">Ugandan</option>
        <option value="Ukrainian">Ukrainian</option>
        <option value="Emirati">Emirati</option>
        <option value="British">British</option>
        <option value="American">American</option>
        <option value="Uruguayan">Uruguayan</option>
        <option value="Uzbekistani">Uzbekistani</option>
        <option value="Ni-Vanuatu">Ni-Vanuatu</option>
        <option value="Vatican">Vatican</option>
        <option value="Venezuelan">Venezuelan</option>
        <option value="Vietnamese">Vietnamese</option>
        <option value="Yemeni">Yemeni</option>
        <option value="Zambian">Zambian</option>
        <option value="Zimbabwean">Zimbabwean</option>
      </select>
      <label>Age *</label>
      <input type="number" min="18" name="member${i}Age" required />
      <label>Gender (Optional)</label>
      <select name="member${i}Gender">
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
    `;
    container.appendChild(section);
  }
}


// Form submission handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  
  /** 
  // Add event listener for team size changes to generate team member fields
  const teamSizeField = document.getElementById("teamSize");
  if (teamSizeField) {
    teamSizeField.addEventListener("change", generateTeamMembers);
    // Initialize team members on page load
    generateTeamMembers();
  }
  **/

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.innerHTML : "Submit";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Submitting...";
    }

    // Remove any existing messages
    const existingMessages = form.querySelectorAll(".form-message");
    existingMessages.forEach((el) => el.remove());

    // Create FormData object
    const formData = new FormData(form);

    // Convert FormData to JSON object with the correct field names
    const formDataObj = {};
    const teamMembers = [];

    // Map form fields to expected API field names
    formData.forEach((value, key) => {
      // Handle team members data
      if (key.startsWith("member") && key.match(/member(\d+)/)) {
        const memberIndex = parseInt(key.match(/member(\d+)/)[1]) - 1;
        const fieldName = key.replace(/member\d+/, "");

        // Initialize team member object if it doesn't exist
        if (!teamMembers[memberIndex]) {
          teamMembers[memberIndex] = {};
        }

        // Map field names to API expected format
        const apiFieldMapping = {
          Name: "teamMemberFullName",
          Email: "teamMemberEmail",
          Phone: "teamMemberPhone",
          Role: "teamMemberRole",
          LinkedIn: "teamMemberLinkedIn",
          Country: "teamMemberCountry",
          Nationality: "teamMemberNationality",
          Age: "teamMemberAge",
          Gender: "teamMemberGender",
        };

        // Set the value in the team member object
        if (apiFieldMapping[fieldName]) {
          teamMembers[memberIndex][apiFieldMapping[fieldName]] = value;
        }
      } else {
        // Handle other form fields
        const apiFieldMapping = {
          teamName: "teamName",
          teamSize: "teamSize",
          leaderName: "teamLeaderFullName",
          leaderEmail: "teamLeaderEmail",
          leaderPhone: "teamLeaderPhone",
          leaderLinkedIn: "teamLeaderLinkedIn",
          leaderCountry: "teamLeaderCountry",
          leaderNationality: "teamLeaderNationality",
          leaderAge: "teamLeaderAge",
          leaderGender: "teamLeaderGender",
          projectTitle: "projectTitle",
          ideaSummary: "ideaSummary",
          problemSolving: "problemSolving",
          technology: "technology",
          alignment: "alignment",
          hasPrototype: "hasPrototype",
          prototypeURL: "prototypeURL",
          projectRepo: "projectRepo",
          heardAbout: "heardAbout",
          hasParticipated: "hasParticipated",
          pastHackathons: "pastHackathons",
          availability: "availability",
        };

        // Use the mapping or the original key if no mapping exists
        const apiKey = apiFieldMapping[key] || key;
        formDataObj[apiKey] = value;
      }
    });

    // Add team members to the form data object
    if (teamMembers.length > 0) {
      formDataObj.teamMembers = teamMembers;
    }

    // Remove client-side validation
    console.log("Form data being sent:", formDataObj);

    // Fetch credentials from secret.yml
    fetch("/secret.yml")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load authentication credentials");
        }
        return response.text();
      })
      .then((yamlText) => {
        // Parse YAML content
        const lines = yamlText.split("\n");
        const credentials = {};

        lines.forEach((line) => {
          if (line.includes(":")) {
            const [key, value] = line.split(":").map((part) => part.trim());
            if (key && value) {
              credentials[key] = value;
            }
          }
        });

        if (!credentials.username || !credentials.password) {
          throw new Error("Authentication credentials not found");
        }

        // Create Basic Auth header
        const authHeader =
          "Basic " + btoa(credentials.username + ":" + credentials.password);

        // Send data to API
        return fetch("https://gfa-tech.com/afcfta-api/api/hackathon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify(formDataObj),
        });
      })
      .then((response) => {
        console.log("Response status:", response.status);

        // Clone the response to read the body regardless of status
        const clonedResponse = response.clone();

        // Try to read the response body
        return clonedResponse.json().then(errorData => {
          if (!response.ok) {
            throw { 
              status: response.status,
              data: errorData 
            };
          }
          return response.json();
        });
      })
      .then((data) => {
        // Handle successful submission
        console.log("Success data:", data);

        // Create success message
        const successDiv = document.createElement("div");
        successDiv.className = "form-message success-message";
        successDiv.style.color = "green";
        successDiv.style.padding = "15px";
        successDiv.style.marginBottom = "20px";
        successDiv.style.backgroundColor = "#e8f5e9";
        successDiv.style.borderRadius = "5px";
        successDiv.innerHTML =
          "<strong>Application submitted successfully!</strong><br>Thank you for your submission.";

        form.prepend(successDiv);
        successDiv.scrollIntoView({ behavior: "smooth" });

        // Reset form
        form.reset();

        // Restore submit button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error submitting form:", error);

        // Create error message
        const errorDiv = document.createElement("div");
        errorDiv.className = "form-message error-message";
        errorDiv.style.color = "red";
        errorDiv.style.padding = "15px";
        errorDiv.style.marginBottom = "20px";
        errorDiv.style.backgroundColor = "#ffebee";
        errorDiv.style.borderRadius = "5px";

        if (error.data?.messages) {
          errorDiv.innerHTML = "<strong>Validation errors:</strong><br>" + 
            Object.entries(error.data.messages)
              .map(([field, message]) => `- ${field}: ${message}`)
              .join("<br>");
        } else {
          errorDiv.innerHTML = "<strong>Error submitting application:</strong><br>" + 
            (error.message || "Please check your network connection and try again");
        }

        form.prepend(errorDiv);
        errorDiv.scrollIntoView({ behavior: "smooth" });

        // Restore submit button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }
      });
  });
}
});