const express = require('express');
const router = express.Router();

const doctors = [
    { id: 1, name: 'Ahmed' },
    { id: 2, name: 'Khaled' },
    { id: 3, name: 'Mahmoud' },
];

router.get('/', (req, res) => {
    res.send(doctors);
});

router.get('/:id', (req, res) => {
    const doctor = doctors.find(c => c.id === parseInt(req.params.id));
    if (!doctor) res.status(404).send('The doctor with given id is not found!');
    else res.send(doctor);
});

router.post('/', (req, res) => {
    const { error } = validateDoctor(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const doctor = {
        id: doctors.length + 1,
        name: req.body.name,
    };
    doctors.push(doctor);
    res.send(doctor);
});

router.put('/:id', (req, res) => {
    const doctor = doctors.find(c => c.id === parseInt(req.params.id));
    if (!doctor) return res.status(404).send('The doctor with given id is not found!');

    const { error } = validateDoctor(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    doctor.name = req.body;
    res.send(doctor);
});

router.delete('/:id', (req, res) => {
    const doctor = doctors.find(c => c.id === parseInt(req.params.id));
    if (!doctor) return res.status(404).send('The doctor with given id is not found!');

    const index = doctors.indexOf(doctor);
    doctors.splice(index, 1);
});

function validateDoctor(doctor) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
    });
    return schema.validate(doctor);
};

module.exports = router;