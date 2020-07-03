import { useQuery } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import { Pokemon } from '../@types/Pokemon'
import { POKEMONS_LOCAL } from '../graphql/queries/PokemonsLocal'

const PAGE_SIZE = 20
const POKEMONS_COUNT = 151

export default function usePokemonList() {

    const [ numberOfPokemonsToLoad, setNumberOfPokemonsToLoad] = useState(POKEMONS_COUNT)
    const [ filterParam, setFilterParam ] = useState('')
    const [ pokemons, setPokemons ] = useState<Pokemon[]>([])
    const [ lastPokemonsFoundCount, setLastPokemonsFoundCount ] = useState(0)
    const [ hasMoreToLoad, setHasMoreToLoad ] = useState(true)

    const {
        loading,
        fetchMore
    } = useQuery<{ pokemons: Pokemon[] }, { first: number }>(
        POKEMONS_LOCAL,
        {
            variables: { first: numberOfPokemonsToLoad },
            onCompleted(data) {
                if (data?.pokemons) {
                    if (lastPokemonsFoundCount < data?.pokemons.length) {
                        setHasMoreToLoad(true)
                        setLastPokemonsFoundCount(data?.pokemons.length)
                        setPokemons(data?.pokemons)
                    } else {
                        setHasMoreToLoad(false)
                    }
                }
            },            
        }
    )

    useEffect(() => {
        fetchMore({
            query: POKEMONS_LOCAL,
            variables: { first: numberOfPokemonsToLoad },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                return Object.assign({}, prev, {
                    pokemons: [...fetchMoreResult.pokemons]
                })
            }
        })
    }, [numberOfPokemonsToLoad, fetchMore])

    return {
        clearFilter() {
            setFilterParam('')
        },
        filter(inputParam : string) {
            setFilterParam(inputParam)
        },
        filterParam,
        pokemons: (pokemons || []).filter(p => p.name.toLocaleLowerCase().includes(filterParam.toLocaleLowerCase())),
        loading,
        loadMore() {
            if (hasMoreToLoad) {
                setNumberOfPokemonsToLoad(numberOfPokemonsToLoad + PAGE_SIZE)
            }
        }
    }
}