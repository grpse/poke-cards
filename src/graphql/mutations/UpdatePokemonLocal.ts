import { gql } from 'apollo-boost'

export const UPDATE_POKEMON_LOCAL = gql`
    mutation UpdatePokemon($pokemon : Pokemon) {
        updatePokemonLocal(pokemon : $pokemon) @client
    }
`