const { Router } = require('express');
const { Breed } = require('../db.js');
const router = Router();
const { getBreedByName, getBreedsApi, getBreedId } = require('../Controller/functions.js');


router.get('/', async(req, res) => {
    try {
        const { name } = req.query;
        
        if (name){
            const breeds = await getBreedByName(name);
            return res.status(200).send(breeds);
        }else {
            const breeds = await getBreedsApi();
            return res.status(200).send(breeds);
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const breed = await getBreedId(id);
        return res.status(200).send(breed);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/', async (req, res) => {
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