const { Breed, Temperament } = require("../db")
const axios = require("axios")
const { Op } = require('sequelize');
const { API_KEY } = process.env

const getBreedsApi = async () => {
    try {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?x-api-key=${API_KEY}`);
        const apiBreeds = response.data.map(b => {
            return {
                id: b.id,
                name: b.name,
                weight_min: parseInt(b.weight.metric.slice(0,2).trim()),
                weight_max: parseInt(b.weight.metric.slice(-2).trim()),
                height_min: parseInt(b.height.metric.slice(0,2).trim()),
                height_max: parseInt(b.height.metric.slice(-2).trim()),
                life_span: b.life_span,
                temperament: b.temperament?.split(', '),
                img: b.image.url
            }
        })
        return apiBreeds;
    } catch (error) {
        return error.message;
    }
}


const getBreedsDb = async () => {
    let breedsDb = await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    return breedsDb;
}

const getBreedByName = async (name) => {
        const breed = await Breed.findOne({
            where: {
                name: name
            }
        })
        if(breed){ return breed }
        
        // const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&x-api-key=${API_KEY}`);
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?x-api-key=${API_KEY}`);
        const breeds = response.data.filter(d => d.name.toLowerCase().includes(name.toLowerCase()) )
        if (breeds.length > 0){
            const breed = breeds.map(b => {
                return {
                    id: b.id,
                    name: b.name,
                    weight_min: parseInt(b.weight.metric.slice(0,2).trim()),
                    weight_max: parseInt(b.weight.metric.slice(-2).trim()),
                    height_min: parseInt(b.height.metric.slice(0,2).trim()),
                    height_max: parseInt(b.height.metric.slice(-2).trim()),
                    life_span: b.life_span,
                    temperament: b.temperament?.split(', '),
                    img: b.image.url
                }
            }) 
            return breed;
        }

/*      if (response.data.length > 0) {
        const breed = response.data.map(b => {
            return {
                id: b.id,
                name: b.name,
                weight_min: parseInt(b.weight.metric.slice(0,2).trim()),
                weight_max: parseInt(b.weight.metric.slice(-2).trim()),
                height_min: parseInt(b.height.metric.slice(0,2).trim()),
                height_max: parseInt(b.height.metric.slice(-2).trim()),
                life_span: b.life_span,
                temperament: b.temperament?.split(', '),
                img: b.reference_image_id
            }
        }) 
        return breed;
        } */

        throw new Error('Breed does not exist!')
}


const getBreedId = async (id) => {
    if (id.length === 36){
        const breed = await Breed.findOne({
            include: Temperament,
            where: {
                id: id
            }
        })
        return breed;
    }
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?x-api-key=${API_KEY}`);

    let breed = response.data.filter(b => b.id === parseInt(id)); 
    if (breed.length === 0) throw new Error('Breed does not exist!')
    breed = {
        id: breed[0].id,
        name: breed[0].name,
        weight_min: parseInt(breed[0].weight.metric.slice(0,2).trim()),
        weight_max: parseInt(breed[0].weight.metric.slice(-2).trim()),
        height_min: parseInt(breed[0].height.metric.slice(0,2).trim()),
        height_max: parseInt(breed[0].height.metric.slice(-2).trim()),
        life_span: breed[0].life_span,
        temperament: breed[0].temperament?.split(', '),
        img: breed[0].image.url
    }
    return breed;
}

const getTemperaments = async () => {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?x-api-key=${API_KEY}`);
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