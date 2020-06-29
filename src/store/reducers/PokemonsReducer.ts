import { Pokemon } from "../../@types/Pokemon"

export const POKEMONS_REDUCER_SET_LOADED = 'POKEMONS_REDUCER_SET_LOADED'
export const POKEMONS_REDUCER_UPDATE = 'POKEMONS_REDUCER_UPDATE'

type PokemonsReducerState = {
    pokemons: Pokemon[]
}

type PokemonsReducerAction = {
    type: string
    payload: any
}

const initialState : PokemonsReducerState = {
    pokemons: []
}

export default function pokemons(state = initialState, action : PokemonsReducerAction) : PokemonsReducerState {
    switch(action.type) {
        case POKEMONS_REDUCER_SET_LOADED: {
            return {
                ...state,
                pokemons: action.payload as Pokemon[]
            }
        }

        case POKEMONS_REDUCER_UPDATE: {
            const pokemonUpdateData = action.payload as Pokemon
            
            const pokemonsNewList = state.pokemons.map(p => {
                if (p.number === pokemonUpdateData.number) {
                    return {
                        ...p,
                        name: pokemonUpdateData.name,
                        attacks: pokemonUpdateData.attacks,
                    }
                } else {
                    return p
                }
            })
            return {
                ...state,
                pokemons: pokemonsNewList
            }
        }
    }
}