const {Types} = require('../db');
const axios = require('axios');

const getTypes = async() => {
    try {
        await axios.get('https://pokeapi.co/api/v2/type/?offset=0&limit=18')
                        .then(res => res.data.results.map(async (type) =>{
                        Types.findOrCreate({
                                where:{
                                    name: type.name
                                    },
                                    order: ['name']
                                })
                            }));
    } catch (error) {
        return error;
    }
};

module.exports = {
    getTypes
};