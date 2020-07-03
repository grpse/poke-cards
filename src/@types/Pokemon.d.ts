export type Pokemon = {
    id: string
    number: string
    name: string
    weight: PokemonDimension
    height: PokemonDimension
    classification: string
    types: string[]
    resistant: string[]
    attacks: PokemonAttack
    weaknesses: string[]
    fleeRate: number
    maxCP: number
    evolutions: Pokemon[]
    evolutionRequirements: PokemonEvolutionRequirement
    maxHP: number
    image: string
}

export type PokemonDimension = {
    minimum: string
    maximum: string
}

export type PokemonAttack = {
    fast: Attack[]
    special: Attack[]
}

export type Attack = {
    name: string
    type: string
    damage: number
}

export type PokemonEvolutionRequirement = {
    amount: number
    name: string
}