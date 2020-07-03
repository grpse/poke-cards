import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-boost'
import { Pokemon } from '../@types/Pokemon'
import { persistCache } from 'apollo-cache-persist'
import { pokemons } from './resolvers/pokemons'
import { updatePokemonLocal } from './resolvers/updatePokemonLocal'
import { getGraphqlUri } from '../utils/getGraphqlUri'

export type CacheDataType = {
    pokemons: Pokemon[]
    updatedPokemons: {
        [id:string]: Pokemon
    }
    first: number
}

export function createApolloClient() {
    const cache = new InMemoryCache()
    const client = new ApolloClient({
        link: new HttpLink({
            uri: getGraphqlUri()
        }),
        cache,
        resolvers: {
            Query: {
                pokemons,
            },
            Mutation: {
                updatePokemonLocal
            },
        },
    })

    cache.writeData<CacheDataType>({
        data: {
            pokemons: [],
            updatedPokemons: {},
            first: 0
        },
    })

    async function setPersistence() {
        try {
            await persistCache({
                cache: client.cache,
                storage: window.localStorage as any,
            })
        } catch(e) {
            console.log('Error', e)
        }
    }

    return {
        client,
        setPersistence
    }
}