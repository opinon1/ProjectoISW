// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

require('dotenv').config();

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set up the MySQL connection
const pool = mysql.createPool({
  host: process.env.SERVER_HOST,
  user: process.env.SERVER_USER, // Your MySQL username
  password: process.env.SERVER_PASSWORD, // Your MySQL password
  database: 'kokua', // Your MySQL database name
  port: process.env.SERVER_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
  connection.release();
});

// Define a simple route


// Define a test API to fetch data from MySQL
app.get('/api/data', (req, res) => {
  pool.query('SELECT * FROM personasapoyo', (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

//------------------------------Persona de apoyo------------------------------------------------------------------
app.get('/api/persona-apoyo/contactos:id', (req, res) =>{
  const idPersonaApoyo = req.params.id;
  const query = 'SELECT Distinct pacientes.IDPaciente, pacientes.Nombre, pacientes.Apellido, pacientes.Padecimento, pacientes.EstatusPaciente FROM pacientes, asignaciones, personasapoyo WHERE pacientes.IDPaciente = asignaciones.IDPaciente AND asignaciones.IDPersonaApoyo = ?';
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

app.get('/api/persona-apoyo/user:id', (req, res) =>{
  const idPersonaApoyo = req.params.id;
  const query = 'SELECT Nombre from personasapoyo where IDPersonaApoyo = ?';
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

//------------------------------Paciente------------------------------------------------------------------
//-----------------------------Citas-------------------------------------------------------------
app.get('/api/paciente/appointments/:id', (req, res) =>{
  const idPersonaApoyo = req.params.id;
  console.log(idPersonaApoyo);
  const query = 'Select  Distinct citas.IDCita, citas.IDPaciente, doctores.IDDoctor, doctores.Nombre, doctores.Apellido, citas.Fecha, citas.TipoCita, citas.EstatusCita from doctores, citas where doctores.IDDoctor = citas.IDDoctor and citas.IDPaciente = ?';
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

app.post('/api/paciente/appointments', (req, res) => {
  const nuevaCita = req.body; // Datos de la nueva cita
  console.log(nuevaCita.IDPaciente);

  const query = 'INSERT INTO citas (IDPaciente, IDDoctor, TipoCita, EstatusCita, Fecha) VALUES (?, ?, ?, ?, ?)';
  pool.query(query, [nuevaCita.IDPaciente, nuevaCita.IDDoctor, nuevaCita.TipoCita, nuevaCita.EstatusCita, nuevaCita.Fecha], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Error al insertar la cita' });
    }
    // Enviar una respuesta con el ID de la cita insertada
    res.json({ message: 'Cita insertada con éxito', insertedId: results.insertId });
  });
});

app.delete('/api/paciente/appointments/:id', (req, res) => {
  const idCita = req.params.id;

  const query = 'DELETE FROM citas WHERE IDCita = ?';
  pool.query(query, [idCita], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Error al eliminar la cita' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json({ message: 'Cita eliminada con éxito', deletedId: idCita });
  });
});
//-----------------------------Chat-------------------------------------------------------------
app.get('/api/paciente/contactos:id', (req, res) =>{
  const idPaciente = req.params.id;
  const query = 'SELECT Distinct doctores.IDDoctor, personasapoyo.IDPersonaApoyo, doctores.Nombre as NombreDoctor, doctores.Apellido as ApellidoDoctor, personasapoyo.Nombre as PersonaApoyoNombre, personasapoyo.Apellido as PersonaApoyoApellido FROM pacientes, asignaciones, personasapoyo, doctores WHERE asignaciones.IDDoctor = doctores.IDDoctor AND personasapoyo.IDPersonaApoyo = asignaciones.IDPersonaApoyo AND asignaciones.IDPaciente = ?';
  pool.query(query, [idPaciente], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

app.get('/api/paciente/user:id', (req, res) =>{
  const idPersonaApoyo = req.params.id;
  const query = 'SELECT Nombre from pacientes where IDPaciente = ?';
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

//-----------------------------ServiciosExtra-------------------------------------------------------------

app.get('/api/paciente/ServiciosExtra', (req, res) =>{
  const query = 'SELECT * from serviciosextra, empresasterceras where serviciosextra.IDEmpresaTercera = empresasterceras.idEmpresaTercera';
  pool.query(query, (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

//----------------------------Seguimiendo medico---------------------------------------------------------------
app.get('/api/paciente/Seguimiento:id', (req, res) =>{
  const idPersonaApoyo = req.params.id;
  const query = `Select 
    Distinct pacientes.Nombre as NombrePaciente, doctores.Nombre as NombreDoctor, personasapoyo.Nombre as NombrePersonaApoyo, 
    citas.Fecha as FechaCita, citas.EstatusCita, citas.TipoCita, medicinas.NombreMedicina, aseguradoras.NombreAseguradora, 
    asignaciones.FechaAsignacion, medicinas.Descripción
    from 
    asignaciones, pacientes, doctores, citas, personasapoyo, usuarios, ordenes, medicinas, polizas, aseguradoras
    where
    asignaciones.IDPaciente = pacientes.IDPaciente AND 
    asignaciones.IDDoctor = doctores.IDDoctor AND
    citas.IDPaciente = asignaciones.IDPaciente AND
    asignaciones.IDPersonaApoyo = personasapoyo.IDPersonaApoyo AND
    usuarios.IDUsuario = pacientes.IDUsuario AND
    usuarios.IDUsuario = ordenes.IDUsuario AND
    ordenes.IDMedicina = medicinas.IDMedicina AND
    polizas.IDPoliza = asignaciones.IDPoliza AND
    aseguradoras.IDAseguradora = polizas.IDAseguradora AND
    asignaciones.IDPaciente = ?`;
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});
 //-----------------------------------------------Fin back------------------------------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});
app.get('/:url(*)', (req, res) => {
  let url = req.params.url
  console.log(url)
  res.sendFile(path.join(__dirname, 'public/'+ url));
});


app.get('*', (req, res) => {
  let url = req.params.url
  console.log(url)
  res.send("Error");
});



// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});