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

const getBreedByName = async (name) => {
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
    // console.log(response.data);
    console.log(id);
    console.log(response.data[0].id)
    console.log(response.data[0].id == id)
    const breed = response.data.filter(b => parseInt(b.id,1) === id);        
    console.log(breed);
    return breed;
    
    // throw new Error('Breed does not exist!')
}

module.exports = { 
    getBreedsApi, 
    getBreedByName,
    getBreedId 
}