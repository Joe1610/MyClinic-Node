const express = require('express');
const router = express.Router();

const appointments = [
    { id: 1, doctor: 'Ahmed', patient: 'Adham' },
];

router.get('/', (req, res) => {
    res.send(appointments);
});

router.get('/:id', (req, res) => {
    const appointment = appointments.find(c => c.id === parseInt(req.params.id));
    if (!appointment) res.status(404).send('The appointment with given id is not found!');
    else res.send(appointment);
});

router.post('/', (req, res) => {
    const { error } = validateAppointment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!doctors.find(c => c.name === req.body.doctor))
        return res.status(400).send('Doctor with the given name is not found');

    if (!patients.find(c => c.name === req.body.patient))
        return res.status(400).send('Patient with the given name is not found');

    const appointment = {
        id: appointments.length + 1,
        doctor: req.body.doctor,
        patient: req.body.patient,
    };
    appointments.push(appointment);
    res.send(appointment);
});

router.put('/:id', (req, res) => {
    const appointment = appointments.find(c => c.id === parseInt(req.params.id));
    if (!appointment) return res.status(404).send('The appointment with given id is not found!');

    const { error } = validateAppointment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if (!doctors.find(c => c.name === req.body.doctor))
        return res.status(400).send('Doctor with the given name is not found');

    if (!patients.find(c => c.name === req.body.patient))
        return res.status(400).send('Patient with the given name is not found');

    appointment.doctor = req.body.doctor;
    appointment.patient = req.body.patient;
    res.send(appointment);
});

router.delete('/:id', (req, res) => {
    const appointment = appointments.find(c => c.id === parseInt(req.params.id));
    if (!appointment) return res.status(404).send('The appointment with given id is not found!');

    const index = appointments.indexOf(appointment);
    appointments.splice(index, 1);
});

function validateAppointment(data) {
    const schema = Joi.object({
        doctor: Joi.string().min(2).required(),
        patient: Joi.string().min(2).required()
    });
    return schema.validate(data);
};

module.exports = router;
