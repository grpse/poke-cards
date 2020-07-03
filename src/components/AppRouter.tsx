import React from 'react'
import { Switch, Route } from 'react-router'
import PokemonsList from './PokemonsList'
import PokemonDetails from './PokemonDetails'

export default function AppRouter() {
    return (
        <Switch>
            <Route path='/' exact>
                <PokemonsList />
            </Route>
            <Route path='/:id'>
                <PokemonDetails />
            </Route>
        </Switch>
    )
}