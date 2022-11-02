import { GET_ALL_POKEMONS, GET_POKEMON_BY_NAME, GET_POKEMON_DETAIL, GET_ALL_TYPES, FILTER_POKES_BY_TYPE, ORDER_BY_NAME, FILTER_POKES_BY_CREATED, CLEAR_DETAIL, ORDER_BY_ATTACK, CREATE_POKEMON } from "../actions";

const initialState = {
    pokemons: [],
    allPokemons : [],
    detailPokemon: [],
    allTypes: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_POKEMONS:
            console.log('Get all pokemons: ', action.payload)
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case GET_ALL_TYPES:
            return {
                ...state,
                allTypes: action.payload
            }
        case GET_POKEMON_BY_NAME:
            return{
                ...state,
                pokemons: action.payload
            }
        case GET_POKEMON_DETAIL:
            console.log('Get detail: ', action.payload)
            return {
                ...state,
                detailPokemon: action.payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                detailPokemon: []
            }
        case FILTER_POKES_BY_TYPE:
            let filterByType = state.allPokemons;
            let filterPokemons = filterByType?.filter(poke => poke.types.map(t => t.name)?.includes(action.payload) || poke.types.includes(action.payload));
            if(action.payload === 'All') filterPokemons = filterByType;
            return {
                ...state,
                pokemons: filterPokemons
            }
        case ORDER_BY_ATTACK:
            const filterByAttack = state.pokemons;
            let filterAttack = action.payload === 'minAttack' ? filterByAttack.sort((a, b) => {
                if(a.attack > b.attack) return 1
                if(a.attack < b.attack) return -1
                return 0
            }) : filterByAttack.sort((a, b) => {
                if(a.attack < b.attack) return 1
                if(a.attack > b.attack) return -1
                return 0
            })
            return {
                ...state,
                pokemons: filterAttack
            }
        case ORDER_BY_NAME:
            const orderFilterPokes = state.pokemons;
            let ordered = action.payload === 'asc' ? orderFilterPokes.sort((a, b) => {
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            }) : orderFilterPokes.sort((a, b) => {
                if(a.name < b.name) return 1
                if(a.name > b.name) return -1
                return 0
            })
            return {
                ...state,
                pokemons: ordered
            }
        case FILTER_POKES_BY_CREATED:
            let filterPokes = state.allPokemons;
            let createds = action.payload === 'created' ? filterPokes.filter(poke => poke.custom === true) : filterPokes.filter(poke => !poke.custom);
            if(!createds.length) return alert('Pokemon not found');
            if(action.payload === 'all') createds = filterPokes;

            return {
                ...state,
                pokemons: createds
            }
        case CREATE_POKEMON:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
};

export default rootReducer;