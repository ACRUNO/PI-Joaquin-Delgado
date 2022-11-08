const { Router } = require('express');
const { Temperament } = require('../db.js');
const router = Router();
const { getTemperaments } = require('../Controller/functions.js');


router.get('/', async (req, res) => {
    try {
        let allTemperaments = await Temperament.findAll()
        if (allTemperaments.length === 0){
            let gettingTemperaments = await getTemperaments();
            console.log(gettingTemperaments);
            await Temperament.bulkCreate(gettingTemperaments);
        }
        allTemperaments = await Temperament.findAll()
        res.status(200).send(allTemperaments);
    } catch (error) {
        res.status(400).send("Cannot load Temperaments");
    }
})

module.exports = router;