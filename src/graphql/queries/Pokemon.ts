import { gql } from 'apollo-boost'

export const POKEMON = gql`
    query GetPokemon($id : String) {
        pokemon(id : $id) {
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

export const POKEMON_BY_NAME = gql`
query GetPokemonByName($name : String) {
    pokemon(name : $name) {
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