import { gql } from 'apollo-boost'

export const POKEMONS_LOCAL = gql`
    query getPokemons($first: Int!) {
        first @client
        pokemons(first: $first) @client {
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