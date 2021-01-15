
const express = require('express');
const Joi = require('joi');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Restful API By Express");
});

// Schema Cars 
const cars = [
    { id: 1, name: "Honda" },
    { id: 2, name: "Ford" },
    { id: 3, name: "Nissan" }
];

// Car All 
app.get('/cars', (req, res) => {
    res.send(cars);
});

// Car By ID 
app.get('/cars/:id', (req, res) => {
    const car = cars.find(e => e.id == req.params.id);
    if (!car) return res.status(400).send("Data is None");

    res.send(car);
});

// insert Cars
app.post('/cars', (req, res) => {
    const { name } = req.body;


    const { error } = validationCar(req.body);
    if (error) return res.send(error.details[0].message);

    const car = {
        id: cars.length + 1,
        name: name
    };

    cars.push(car);
    res.send(car);
});

// update Car 
app.put('/cars/:id', (req, res) => {
    const { name } = req.body;

    const { error } = validationCar(req.body);
    if (error) return res.send(error.details[0].message);

    const car = cars.find(e => e.id == req.params.id);
    if (!car) return res.status(400).send("Data is None for Update");

    car.name = name;
    res.send(car);

});

// delete car
app.delete('/cars/:id', (req, res) => {
    const car = cars.find(e => e.id == req.params.id);
    if (!car) return res.status(400).send("Data is None for Delete");

    const index = cars.indexOf(car);
    cars.splice(index, 1);
    res.send(cars);
});

// validation Cars 
function validationCar(car) {
    const schemac_car = Joi.object({
        name: Joi.string().min(3)
    });

    return schemac_car.validate(car);
}
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
