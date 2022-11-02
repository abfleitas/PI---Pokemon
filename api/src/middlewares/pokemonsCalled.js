const axios = require("axios");
const {Pokemon, Types} = require("../db")

const getPokemonsApi = async() => {
    try {
        const api = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
        await Promise.all(api.data.results.map(async (poke) => {
            const result = await axios.get(poke.url);
            const data = result.data;
            const pokemon = {
                id: data.id,
                name: data.name,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                imgUrl: data.sprites.other.home.front_default,
                custom: false
            }

            const types = data.types.map(t => t.type.name);
            const newTypes = await Types.findAll({where: {name: types}})
            const newPokemon = await Pokemon.create(pokemon);
            await newPokemon.addTypes(newTypes);
        }));
    } catch (error) {
        console.log(error);
    }
}

// const getOnePokemon = async (dato) => {
//     try {
//         const byName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${dato}`);
//         let pokemon = {
//             id: byName.data.id,
//             name: byName.data.name,
//             types: byName.data.types.map(t => t.type.name),
//             hp: byName.data.stats[0].base_stat,
//             attack: byName.data.stats[1].base_stat,
//             defense: byName.data.stats[2].base_stat,
//             speed: byName.data.stats[5].base_stat,
//             height: byName.data.height,
//             weight: byName.data.weight,
//             imgUrl: byName.data.sprites.other.home.front_default
//         }
//         return pokemon;
//     } catch (error) {
        
//     }
// }

// const allPokemons = async() => {
//     try {
//         const pokesApi = await getPokemonsApi();
//         const pokesDb = await getPokemonsDB();
//         const allPokemons = [...pokesApi, ...pokesDb]

//         return allPokemons;
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports = {
    getPokemonsApi
}