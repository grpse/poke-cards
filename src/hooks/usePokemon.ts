import { useQuery, useMutation } from '@apollo/react-hooks'
import { useState } from 'react'
import { Pokemon } from '../@types/Pokemon'
import { UPDATE_POKEMON_LOCAL } from '../graphql/mutations/UpdatePokemonLocal'
import { POKEMON } from '../graphql/queries/Pokemon'

export default function usePokemon(id : string) {

    const [ pokemon, setPokemon ] = useState<Pokemon>(null as any)
    const [ originalData, setOriginalData ] = useState<Pokemon>(null as any)
    const { loading } = useQuery<{ pokemon: Pokemon }, { id : string }>(
        POKEMON,
        {
            variables: { id },
            onCompleted(data) {
                if (data?.pokemon) {
                    setPokemon(data.pokemon)
                    setOriginalData(data.pokemon)
                }
            }
        }
    )

    const [
        updatePokemon
    ] = useMutation<{ pokemon: Pokemon}>(
        UPDATE_POKEMON_LOCAL,
        {
            variables: { id }
        },
    )

    return {
        pokemon,
        loading,
        setPokemon,
        savePokemon() {
            setOriginalData(pokemon)
            updatePokemon({ variables: { pokemon }})
        },
        revertChanges() {
            setPokemon(originalData)
        }
    }
}