const { Pokemon , Types} = require('../db');
const {getPokemonsApi} = require("./pokemonsCalled");

const getPokemonsDB = async () => {
    try {
        const exist = await Pokemon.findOne({where: {id: 1}})
        if(!exist) await getPokemonsApi();
        const results = await Pokemon.findAll({
            include:[
                {
                model: Types,
                attributes:['name'],
                through:{
                    attributes: [],
                }}
            ],
            order: ['id']
        });
        return results;
    } catch (error) {
        console.log(error);
    }
};

const getPokemonByIdDB = async (id) => {
    const resultById = await Pokemon.findByPk(id, {
        include:[
            {
            model: Types,
            attributes:['name'],
            through:{
                attributes: [],
            }}
        ]
    });

    return resultById;
};

const getPokemonByNameDB = async (name) => {
    const resultByName = await Pokemon.findOne({
        where: {name: name}, 
        include:[
            {
            model: Types,
            attributes:['name'],
            through:{
                attributes: [],
            }}
        ]
    });
    return resultByName;
};

module.exports = {
    getPokemonsDB,
    getPokemonByIdDB,
    getPokemonByNameDB
}