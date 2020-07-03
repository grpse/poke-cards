import { gql } from 'apollo-boost'

export const POKEMONS = gql`
    query GetPokemons($first: Int!) {
        pokemons(first: $first) {
            id
            number
            name
            weight {
                minimum
                maximum
            }
            height {
                minimum
                maximum
            }
            classification
            types
            resistant
            attacks {
                fast {
                    name
                    type
                    damage
                }
                special {
                    name
                    type
                    damage
                }
            }
            weaknesses
            fleeRate
            maxCP
            evolutions {
                id
                number
                name
                weight {
                    minimum
                    maximum
                }
                height {
                    minimum
                    maximum
                }
                classification
                types
                resistant
                attacks {
                    fast {
                        name
                        type
                        damage
                    }
                    special {
                        name
                        type
                        damage
                    }
                }
                weaknesses
                fleeRate
                maxCP
                evolutionRequirements {
                    amount
                    name
                }
                maxHP
                image
            }
            evolutionRequirements {
                amount
                name
            }
            maxHP
            image
        }
    }
`