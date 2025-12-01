// Updated script.js to match backend endpoints

const API_BASE_URL = "https://final-project-backend-production-83f0.up.railway.app"; // empty string since backend is served on same origin

// -------------------- OFFICES --------------------

// Get all offices
async function getOffices() {
const res = await fetch(`${API_BASE_URL}/offices`);
return await res.json();
}

// Get office by ID
async function getOffice(id) {
const res = await fetch(`${API_BASE_URL}/offices/${id}`);
return await res.json();
}

// Create new office
async function createOffice(office) {
const res = await fetch(`${API_BASE_URL}/offices`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(office)
});
return await res.json();
}

// Update office
async function updateOffice(id, office) {
const res = await fetch(`${API_BASE_URL}/offices/${id}`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(office)
});
return await res.json();
}

// Delete office
async function deleteOffice(id) {
const res = await fetch(`${API_BASE_URL}/offices/${id}`, { method: "DELETE" });
return await res.json();
}

// -------------------- DOCTORS --------------------

// Get all doctors
async function getDoctors() {
const res = await fetch(`${API_BASE_URL}/doctors`);
return await res.json();
}

// Get doctor by ID
async function getDoctor(id) {
const res = await fetch(`${API_BASE_URL}/doctors/${id}`);
return await res.json();
}

// Create new doctor
async function createDoctor(doctor) {
const res = await fetch(`${API_BASE_URL}/doctors`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(doctor)
});
return await res.json();
}

// Update doctor
async function updateDoctor(id, doctor) {
const res = await fetch(`${API_BASE_URL}/doctors/${id}`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(doctor)
});
return await res.json();
}

// Delete doctor
async function deleteDoctor(id) {
const res = await fetch(`${API_BASE_URL}/doctors/${id}`, { method: "DELETE" });
return await res.json();
}

// -------------------- PATIENTS --------------------

// Get all patients
async function getPatients() {
const res = await fetch(`${API_BASE_URL}/patients`);
return await res.json();
}

// Get patient by ID
async function getPatient(id) {
const res = await fetch(`${API_BASE_URL}/patients/${id}`);
return await res.json();
}

// Create new patient
async function createPatient(patient) {
const res = await fetch(`${API_BASE_URL}/patients`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(patient)
});
return await res.json();
}

// Update patient
async function updatePatient(id, patient) {
const res = await fetch(`${API_BASE_URL}/patients/${id}`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(patient)
});
return await res.json();
}

// Delete patient
async function deletePatient(id) {
const res = await fetch(`${API_BASE_URL}/patients/${id}`, { method: "DELETE" });
return await res.json();
}


// -------------------- COMMUNICATIONS --------------------

// Get communications for a patient
async function getCommunications(patientId) {
const res = await fetch(`${API_BASE_URL}/communications/patient/${patientId}`);
return await res.json();
}

// Create communication
async function createCommunication(comm) {
const res = await fetch(`${API_BASE_URL}/communications`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(comm)
});
return await res.json();
    
}


/* -------------------- PRODUCTS -------------------- */
document.querySelectorAll('.product-crud-form').forEach(formEl => {
const btn = formEl.querySelector('button');
if (!btn) return;
btn.addEventListener('click', e => {
e.preventDefault();
handleCrudFormSubmission(formEl);
});
});


/* -------------------- ORDERS -------------------- */
document.querySelectorAll('.order-crud-form').forEach(formEl => {
const btn = formEl.querySelector('button');
if (!btn) return;
btn.addEventListener('click', e => {
e.preventDefault();
handleCrudFormSubmission(formEl);
});
});


/* -------------------- KITS -------------------- */
document.querySelectorAll('.kit-crud-form').forEach(formEl => {
const btn = formEl.querySelector('button');
if (!btn) return;
btn.addEventListener('click', e => {
e.preventDefault();
handleCrudFormSubmission(formEl);
});
});


/* -------------------- ADMINS -------------------- */
document.querySelectorAll('.admin-crud-form').forEach(formEl => {
const btn = formEl.querySelector('button');
if (!btn) return;
btn.addEventListener('click', e => {
e.preventDefault();
handleCrudFormSubmission(formEl);
});
});
