const express = require('express');
const router = express.Router();

const patients = [
    { id: 1, name: 'Hassan' },
    { id: 2, name: 'Adham' },
    { id: 3, name: 'Mariam' },
];

router.get('/', (req, res) => {
    res.send(patients);
});

router.get('/:id', (req, res) => {
    const patient = patients.find(c => c.id === parseInt(req.params.id));
    if (!patient) res.status(404).send('The patient with given id is not found!');
    else res.send(patient);
});

router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required()
    });
    const { error } = validatePatient(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const patient = {
        id: patients.length + 1,
        name: req.body.name,
    };
    patients.push(patient);
    res.send(patient);
});

router.put('/:id', (req, res) => {
    const patient = patients.find(c => c.id === parseInt(req.params.id));
    if (!patient) return res.status(404).send('The patient with given id is not found!');

    const { error } = validateDoctor(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    patient.name = req.body;
    res.send(patient);
});

router.delete('/:id', (req, res) => {
    const patient = patients.find(c => c.id === parseInt(req.params.id));
    if (!patient) return res.status(404).send('The patient with given id is not found!');

    const index = patients.indexOf(patient);
    patients.splice(index, 1);
});

function validatePatient(patient) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
    });
    return schema.validate(patient);
}

module.exports = router;
