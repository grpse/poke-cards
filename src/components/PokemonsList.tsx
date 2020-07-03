import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useHistory } from 'react-router-dom'
import usePokemonList from '../hooks/usePokemonList'
import { Container, AppBar } from '@material-ui/core'
import { FilterToolbar } from './FilterToolbar'

export default function PokemonsList() {
    const [ hasHitBottom, setHitBottom ] = useState(false)
    const classes = useStyles()
    const history = useHistory()
    const { loading, pokemons, filter, filterParam, loadMore } = usePokemonList()
    const matchFor1TileForRow = useMediaQuery('(max-width:600px)')
    const matchFor2TilesForRow = useMediaQuery('(max-width:900px)')
    const columnPortion = 1.0 / (matchFor1TileForRow ? 1 : (matchFor2TilesForRow ? 2 : 4))

    return (
        <Container maxWidth='xl' classes={{ root: classes.root }} className={classes.container} onScroll={e => {
            const target = e.target as HTMLDivElement
            const bottom = target.scrollHeight - target.scrollTop === target.clientHeight
            if (bottom && !hasHitBottom) { 
                loadMore()
            }

            setHitBottom(bottom)
        }}>
            <AppBar position='sticky'>
                <FilterToolbar filterParam={filterParam} onFilter={filter} />
            </AppBar>
            <GridList cols={1} cellHeight={256} classes={{root: classes.gridListRoot}}>
                {
                    pokemons.map((pokemon, index) => (
                        <GridListTile
                            key={index}
                            classes={{ tile: classes.tile, imgFullHeight: '100%' }}
                            cols={columnPortion}
                            onClick={() => history.push(pokemon.id)} >
                            <img src={pokemon.image} className={classes.image} alt={pokemon.name} />
                            <GridListTileBar
                                title={`#${pokemon.number} - ${pokemon.name}`}
                                subtitle={
                                    <span>
                                        Types: {pokemon.types.join(', ')}
                                    </span>
                                }
                            />
                        </GridListTile>
                    ))
                }
                {
                loading &&
                    <GridListTile cols={1} classes={{ tile: classes.loaderContainer }}>
                        <CircularProgress className={classes.loader} />
                    </GridListTile>
                }
            </GridList>

        </Container>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'absolute',
            height: '100%',
            width: '100%',
        },
        root: {
            overflowY: 'auto',
            height: '100%',
            padding: 0,
            margin: 0,
            backgroundColor: theme.palette.background.paper,
        },
        gridListRoot: {
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            margin: '0px !important',
        },
        tile: {
            display: 'flex',
            '&:hover': {
                cursor: 'pointer'
            }
        },
        image: {
            objectFit: 'contain',
        },
        loaderContainer: {
            height: '100%',
            display: 'inline-flex',
            position: 'relative',
            width: '100%',
            justifyContent: 'center',
        },
        loader: {
            justifyContent: 'center',
            alignSelf: 'center'
        },
    }),
)