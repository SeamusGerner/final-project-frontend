const express = require('express');     // orig
const path = require('path');   //
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();  //
const PORT = process.env.PORT || 8080;  //

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));    //

// MySQL connection
const dbConfig = {
host: process.env.DB_HOST || 'localhost',
user: process.env.DB_USER || 'youruser',
password: process.env.DB_PASS || 'yourpassword',
database: process.env.DB_NAME || 'yourdb',
};

async function query(sql, params) {
const conn = await mysql.createConnection(dbConfig);
const [results] = await conn.execute(sql, params);
await conn.end();
return results;
}

// -------------------- DOCTORS CRUD --------------------
// Get all doctors
app.get('/api/doctors', async (req, res) => {
try {
const doctors = await query('SELECT * FROM doctors');
res.json(doctors);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Get doctor by ID
app.get('/api/doctors/', async (req, res) => {
try {
const doctors = await query('SELECT * FROM doctors WHERE id = ?', [req.params.id]);
res.json(doctors[0] || null);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Create new doctor
app.post('/api/doctors', async (req, res) => {
try {
const { name, specialty, phone, email } = req.body;
const result = await query('INSERT INTO doctors (name, specialty, phone, email) VALUES (?, ?, ?, ?)', [name, specialty, phone, email]);
res.json({ id: result.insertId, name, specialty, phone, email });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Update doctor
app.put('/api/doctors/', async (req, res) => {
try {
const { name, specialty, phone, email } = req.body;
await query('UPDATE doctors SET name=?, specialty=?, phone=?, email=? WHERE id=?', [name, specialty, phone, email, req.params.id]);
res.json({ id: req.params.id, name, specialty, phone, email });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Delete doctor
app.delete('/api/doctors/', async (req, res) => {
try {
await query('DELETE FROM doctors WHERE id=?', [req.params.id]);
res.json({ success: true });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// -------------------- PATIENTS CRUD --------------------
// Get all patients
app.get('/api/patients', async (req, res) => {
try {
const patients = await query('SELECT * FROM patients');
res.json(patients);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Get patient by ID
app.get('/api/patients/', async (req, res) => {
try {
const patients = await query('SELECT * FROM patients WHERE id=?', [req.params.id]);
res.json(patients[0] || null);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Create new patient
app.post('/api/patients', async (req, res) => {
try {
const { name, dob, phone, email } = req.body;
const result = await query('INSERT INTO patients (name, dob, phone, email) VALUES (?, ?, ?, ?)', [name, dob, phone, email]);
res.json({ id: result.insertId, name, dob, phone, email });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Update patient
app.put('/api/patients/', async (req, res) => {
try {
const { name, dob, phone, email } = req.body;
await query('UPDATE patients SET name=?, dob=?, phone=?, email=? WHERE id=?', [name, dob, phone, email, req.params.id]);
res.json({ id: req.params.id, name, dob, phone, email });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Delete patient
app.delete('/api/patients/', async (req, res) => {
try {
await query('DELETE FROM patients WHERE id=?', [req.params.id]);
res.json({ success: true });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// -------------------- COMMUNICATIONS CRUD --------------------
// Get all communications
app.get('/api/communications', async (req, res) => {
try {
const comms = await query('SELECT * FROM communications');
res.json(comms);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Get communication by ID
app.get('/api/communications/', async (req, res) => {
try {
const comms = await query('SELECT * FROM communications WHERE id=?', [req.params.id]);
res.json(comms[0] || null);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Create communication
app.post('/api/communications', async (req, res) => {
try {
const { patient_id, doctor_id, type, date, notes } = req.body;
const result = await query('INSERT INTO communications (patient_id, doctor_id, type, date, notes) VALUES (?, ?, ?, ?, ?)', [patient_id, doctor_id, type, date, notes]);
res.json({ id: result.insertId, patient_id, doctor_id, type, date, notes });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Update communication
app.put('/api/communications/', async (req, res) => {
try {
const { patient_id, doctor_id, type, date, notes } = req.body;
await query('UPDATE communications SET patient_id=?, doctor_id=?, type=?, date=?, notes=? WHERE id=?', [patient_id, doctor_id, type, date, notes, req.params.id]);
res.json({ id: req.params.id, patient_id, doctor_id, type, date, notes });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Delete communication
app.delete('/api/communications/', async (req, res) => {
try {
await query('DELETE FROM communications WHERE id=?', [req.params.id]);
res.json({ success: true });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// -------------------- FALLBACK ROUTE --------------------
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(Server running on port ${PORT}));