const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const breedRouter = require('./breeds.js');
const temperamentRouter = require('./temperaments.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', breedRouter);
router.use('/temperaments', temperamentRouter);


module.exports = router;