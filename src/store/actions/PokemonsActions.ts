import { Pokemon } from "../../@types/Pokemon";
import { PokemonsReducerAction, POKEMONS_REDUCER_SET_LOADED, POKEMONS_REDUCER_UPDATE } from "../reducers/PokemonsReducer";

export function setPokemons(pokemons : Pokemon[]) : PokemonsReducerAction {
    return {
        type: POKEMONS_REDUCER_SET_LOADED,
        payload: {
            pokemonsList: pokemons
        }
    }
}

export function updatePokemon(pokemon : Pokemon) : PokemonsReducerAction {
    return {
        type: POKEMONS_REDUCER_UPDATE,
        payload: {
            pokemonUpdateData: pokemon
        }
    }
}