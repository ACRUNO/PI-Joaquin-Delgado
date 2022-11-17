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
    const breeds = await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });

    const breedsDb = breeds?.map(b => {
        const { Temperaments } = b;
        const breedsData = {
            ...b.dataValues,
            temperament: Temperaments.map(t => t.name)
        }
        return breedsData
    })
    delete breedsDb["Temperaments"];
    return breedsDb;
}

const getBreedByName = (name, breeds) => {
    const breedFilter = breeds.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
    return breedFilter;
}

const getBreedId = async (id, breeds) => {
    const breed = await breeds.filter(b => b.id.toString() === id)
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

const getAllBreeds = async () => {
    const breedsApi = await getBreedsApi();
    const breedsDb = await getBreedsDb();
    const breeds = [...breedsApi, ...breedsDb];
    return breeds;
}

module.exports = { 
    getAllBreeds, 
    getBreedByName,
    getBreedId,
    getTemperaments, 
}