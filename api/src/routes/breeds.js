const { Router } = require('express');
const { Breed, Temperament } = require('../db.js');
const router = Router();
const { getBreedByName, getBreedId, getAllBreeds } = require('../Controller/functions.js');


router.get('/', async(req, res) => {
    try {
        const { name } = req.query;
        const breeds = await getAllBreeds();

        if (name){
            const breedsFiltered = getBreedByName(name, breeds);
            return res.status(200).send(breedsFiltered);
        }
            
            return res.status(200).send(breeds);
        
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const breeds = await getAllBreeds();

        const breed = await getBreedId(id, breeds);
        return res.status(200).send(breed);
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

router.post('/', async (req, res) => {
    try {
        const { id, name, height_min, height_max, weight_min, weight_max, life_span, img, temperament } = req.body;
        if (!name || !height_min || !height_max || !weight_min || !weight_max) throw new Error('Missing data!');
        const newBreed = await Breed.create({
            id,
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            life_span, 
            img
        })

        temperament.split(', ').map(async t => {
            const newTemperament = await Temperament.findAll({
                where: {
                    name: t
                }
            });
            newBreed.addTemperament(newTemperament);
        })
        
        res.status(201).send(newBreed);
    } catch (error) {
        res.status(400).send(error.message);
    }
})



module.exports = router;