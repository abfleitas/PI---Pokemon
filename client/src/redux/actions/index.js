import axios from 'axios';
export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';
export const FILTER_POKES_BY_TYPE = 'FILTER_POKES_BY_TYPE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK';
export const FILTER_POKES_BY_CREATED = 'FILTER_POKES_BY_CREATED';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const CREATE_POKEMON = 'CREATE_POKEMON'

export const getAllPokemons = () => async (dispatch)=>{
    try {
        let allPokes = await axios.get('/pokemons');
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: allPokes.data
        })
    } catch (error) {
        console.log(error)
    }
};

export const getPokemonByName = (poke) => async (dispatch) => {
    try {
        let info = await axios.get(`/pokemons?name=${poke}`);
        return dispatch({
            type: GET_POKEMON_BY_NAME,
            payload: info.data
        })
    } catch (error) {
        return alert('Pokemon not found');
    }
};

export const getPokemonDetail = (id) => async (dispatch) => {
    try {
        console.log('numero', id);
        let detail = await axios.get(`/pokemons/${id}`);
        return dispatch({
            type: GET_POKEMON_DETAIL,
            payload: detail.data
        })
    } catch (error) {
        console.log(error)
    }
};

export const getAllTypes = () => async (dispatch) => {
    return await axios.get('/types')
                .then(res => dispatch({type: GET_ALL_TYPES, payload: res.data}))
};

export const postPokemon = (pokemon) => async(dispatch) => {
    try {
        await axios.post('/pokemons', pokemon);
        return dispatch({
            type: CREATE_POKEMON    
        })
    } catch (error) {
        console.log(error) 
    }
};

export const deletePokemon = async(id) => {
    try {
        await axios.delete(`/pokemons/${id}`);
        return alert('Pokemon eliminado correctamente');
    } catch (error) {
        console.log(error);
    }
}

export const filterPokesByType = (payload) => {
    return {
        type: FILTER_POKES_BY_TYPE,
        payload
    }
};

export const filterPokesByCreated = (payload) => {
    return {
        type: FILTER_POKES_BY_CREATED,
        payload
    }
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export const orderByAttack = (payload) => {
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
};

export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL
    }
};