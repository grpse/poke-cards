import { Pokemon } from "../../@types/Pokemon"
import { InMemoryCache, ApolloClient } from "apollo-boost"
import { POKEMONS_LOCAL } from "../queries/PokemonsLocal"
import { POKEMONS } from '../queries/Pokemons'
import { CacheDataType } from "../createApolloClient"
import { GET_FIRST_FIELD_FROM_LOCAL } from "../queries/GetFirstFieldFromLocal"

export async function pokemons(_ : any, { first } : { first : number }, { cache, client } : { cache : InMemoryCache, client : ApolloClient<any>}) {
                    
    let cachedData : CacheDataType | null = null

    try {
        const previousFirstData : { first : number } | null = cache.readQuery({ query: GET_FIRST_FIELD_FROM_LOCAL })

        if (previousFirstData?.first === first) {

            cachedData = cache.readQuery({ query: POKEMONS_LOCAL, variables: { first } })
    
            if (first === cachedData?.first) {
                return cachedData.pokemons
            }
        }

    } catch(e) {
        console.log('Error on getting from cache', e)
    }

    try {
        
        const data : {
            data: {
                pokemons: Pokemon[]
            },
            loading: boolean
        } = await client.query({
            query: POKEMONS,
            variables: { first }
        })
        
        const fetchedPokemons = data?.data.pokemons
        
        if (cachedData) {
            
            const mergedPokemonsWithModifiedOnes = fetchedPokemons.map((fp, index) => {
                if (cachedData?.pokemons[index]) {
                    return cachedData?.pokemons[index]
                } else {
                    return fp
                }
            })

            cache.writeData({
                data: {
                    pokemons: mergedPokemonsWithModifiedOnes,
                    first
                }
            })

            return mergedPokemonsWithModifiedOnes
        } else {

            cache.writeData({
                data: {
                    pokemons: fetchedPokemons,
                    first
                }
            })

            return fetchedPokemons
        }
        
    } catch(e) {
        console.log('Error fetching pokemons list:', e)
    }
}