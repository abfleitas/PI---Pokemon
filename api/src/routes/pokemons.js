const { Router } = require('express');
const { Pokemon, Types } = require("../db.js");
const { getPokemonByIdDB, getPokemonByNameDB, getPokemonsDB} = require('../middlewares/pokeDbCalled.js');
const router = Router();

router.get('/', async(req, res) => {
    try {
        let {name} = req.query;
        if(name){
            const byName = name.toLowerCase()
            const contain = await getPokemonByNameDB(byName);
            if(!contain) return res.status(400).send("Pokemon not found by name")
            return res.status(200).send([contain]);
        }
        const allPokes = await getPokemonsDB();
        return res.status(200).send(allPokes);
    } catch (error) {
        return res.send(error);
    }
})

router.post('/', async (req, res) => {
    try {
        let { name, attack, defense, speed, hp, height, weight, imgUrl, tipos } = req.body;
        const pokes = await Pokemon.findAll();
        let id = pokes.length;

        if (!name) return res.send({ info: "El nombre es obligatorio" });
        const existe = await Pokemon.findOne({ where: { name: name } });
        if (existe) throw Error("El pokemon ya existe");
        if(!imgUrl) imgUrl = 'https://i0.wp.com/gamerfocus.co/wp-content/uploads/2015/02/Pokemon-1.png?ssl=1';

        const newPokemon = { id: ++id, name, attack, defense, speed, hp, height, weight, imgUrl};
        const poke = await Pokemon.create(newPokemon);

        let types = await Types.findAll({where: {name: tipos}})
        await poke.addTypes(types);
        
        return res.status(200).send('Pokemon creado');
        
    } catch (error) {
        return res.status(404).send(error);
    }
});

router.get('/:idPokemon', async (req, res) => {
    try {
        const {idPokemon} = req.params;
        const result = await getPokemonByIdDB(idPokemon);
        return res.status(200).send(result);

    } catch (error) {
        return res.status(404).send(error);
    }  
});

router.delete('/:idPokemon', async (req, res) => {
    try {
        const {idPokemon} = req.params;
        const poke = await Pokemon.findByPk(idPokemon);
        if(poke){
            await poke.destroy();
            res.status(200).send('eliminado');
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;