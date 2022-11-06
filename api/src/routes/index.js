const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Breed } = require('../db.js');
const morgan = require('morgan');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use(express.json());
// router.use(morgan('dev'));


router.post('/dogs', async (req, res) => {
    try {
        const { id, name, height, weight, life_span } = req.body;
        if (!name || !height || !weight) throw new Error('Missing data!');
        const newBreed = await Breed.create({
            id,
            name,
            height,
            weight,
            life_span
        })
        res.status(201).send(newBreed);
    } catch (error) {
        res.status(400).send(error.message);
    }
})



module.exports = router;