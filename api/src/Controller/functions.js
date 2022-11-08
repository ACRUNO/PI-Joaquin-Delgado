const { Breed, Temperament } = require("../db")
const axios = require("axios")
const { Op } = require('sequelize');

const getBreedsApi = async () => {
    try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds');
        const apiBreeds = response.data.map(b => {
            return {
                id: b.id,
                name: b.name,
                height: b.height.metric,
                weight: b.weight.metric,
                life_span: b.life_span,
                img: b.image.url
            }
        })
        return apiBreeds;
    } catch (error) {
        return error.message;
    }
}

const getBreedsDb = async () => {
    let breedsDb = await Breed.findAll();
    return breedsDb;
}

const getBreedByName = async (name) => {
        
        const breed = await Breed.findOne({
            where: {
                name: name
            }
        })
        if(breed){ return breed }
        
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
        if (response.data.length > 0) {
        const breed = response.data.map(b => {
            return {
                id: b.id,
                name: b.name,
                height: b.height.metric,
                weight: b.weight.metric,
                life_span: b.life_span,
                img: b.reference_image_id
            }
        }) 
        return breed;
        }

        throw new Error('Breed does not exist!')
}


const getBreedId = async (id) => {
    if (id.length === 36){
        const breed = await Breed.findOne({
            where: {
                id: id
            }
        })
        return breed;
    }
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');

    let breed = response.data.filter(b => b.id === parseInt(id)); 
    if (breed.length === 0) throw new Error('Breed does not exist!')
    breed = {
        id: breed[0].id,
        name: breed[0].name,
        height: breed[0].height.metric,
        weight: breed[0].weight.metric,
        life_span: breed[0].life_span,
        img: breed[0].image.url
    }
    return breed;
}

const getTemperaments = async () => {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    let allTemperaments = [];
    response.data.forEach(t => {
        if (t.temperament){
            allTemperaments.push(...t.temperament.split(', '))
        }
    });
    allTemperaments = [...new Set(allTemperaments)]
    allTemperaments = allTemperaments.map(t => {
        return {
            name: t
        }
    })
    return allTemperaments;
}

module.exports = { 
    getBreedsApi, 
    getBreedByName,
    getBreedId,
    getTemperaments,
    getBreedsDb 
}