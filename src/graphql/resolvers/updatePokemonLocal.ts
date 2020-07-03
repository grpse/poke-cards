import { Pokemon } from '../../@types/Pokemon'
import { InMemoryCache } from 'apollo-boost'

export function updatePokemonLocal(_ : any, { pokemon } : { pokemon : Pokemon}, { cache } : { cache : InMemoryCache }) {
    cache.writeData({
        data: {
            [`Pokemon:${pokemon.id}`]: pokemon
        }
    })
}