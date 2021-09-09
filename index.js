const config = require('config');
const debug = require('debug')('app:startup');
const Joi = require('joi');
const express = require('express');
const doctors = require('./Routes/doctors');
const patients = require('./Routes/patients');
const appointments = require('./Routes/appointments');
const home = require('./Routes/home');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', home);
app.use('/api/doctors', doctors);
app.use('/api/patients', patients);
app.use('/api/appointments', appointments);
app.set('view engine', 'pug');


const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`listening on port ${port}`));
