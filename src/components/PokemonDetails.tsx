import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import { Container, CircularProgress, Avatar } from '@material-ui/core'
import { useParams, useHistory } from 'react-router'
import usePokemon from '../hooks/usePokemon'
import { EditingFieldGroup } from './EditingFieldGroup'

export default function PokemonDetails() {
    const { id } = useParams()
    const history = useHistory()
    const { loading, pokemon, setPokemon, savePokemon, revertChanges } = usePokemon(id)
    const classes = useStyles()
    const [ isEditing, setIsEditing ] = useState(false)

    const save = () => {
        setIsEditing(false)
        savePokemon()
    }

    const edit = () => {
        setIsEditing(true)
    }

    const revertChangesAndQuitEditing = () => {
        setIsEditing(false)
        revertChanges()
    }

    if (loading || !pokemon) {
        return (
            <div className={classes.loaderContainer}>
                <CircularProgress className={classes.loader} />
            </div>
        )
    } else {
        return (
            <Container className={classes.container} maxWidth='md'>
                <Card>
                    <CardMedia
                        component='img'
                        alt={pokemon?.name}
                        height='256px'
                        image={pokemon?.image}
                        title={pokemon?.name}
                        className={classes.image}
                        />
                    <CardContent>
                        <Typography gutterBottom variant='h6' component='h2'>
                            #{pokemon?.number} - {pokemon?.name}
                        </Typography>
                        <Typography variant='subtitle1' component='h6'>
                            Type
                        </Typography>
                        <EditingFieldGroup
                            placeholder={'type'}
                            isEditing={isEditing}
                            values={pokemon?.types}
                            onChange={newTypes => {
                                setPokemon({ ...pokemon, types: newTypes })
                            }}
                            />
                        <Typography variant='subtitle1' component='h6'>
                            Attacks
                        </Typography>
                        <Typography variant='caption' color='textSecondary' component='p'>
                            Fast:
                        </Typography>
                        {pokemon?.attacks?.fast?.map((attack, index) => (
                            <Chip key={index} label={attack.name} variant='outlined' />
                        ))}
                        <Typography variant='caption' color='textSecondary' component='p'>
                            Special:
                        </Typography>
                        {pokemon?.attacks?.special?.map((attack, index) => (
                            <Chip key={index} label={attack.name} variant='outlined' />
                        ))}
                        {
                            pokemon?.evolutions &&
                            <Typography variant='caption' color='textSecondary' component='p'>
                                Evolutions:
                            </Typography>
                        }
                        {   
                            pokemon?.evolutions?.map(evolution => (
                                <Chip
                                    avatar={<Avatar alt={evolution.name} src={evolution.image} />}
                                    label={evolution.name}
                                    onClick={() => history.push(evolution.id)}
                                />
                            ))
                        }
                    </CardContent>

                    <CardActions>
                        <Button onClick={() => history.goBack()} size='small' color='primary'>
                            Back
                        </Button>
                        {
                            isEditing ?
                                <>
                                    <Button onClick={revertChangesAndQuitEditing} size='small' color='primary'>
                                        Revert Changes
                                    </Button>
                                    <Button onClick={save} size='small' variant='contained' color='secondary'>
                                        Save
                                    </Button>
                                </>
                                :
                                <Button onClick={edit} size='small' color='primary'>
                                    Edit
                                </Button>
                        }
                        
                    </CardActions>
                </Card>
            </Container>
        )
    }
}

const useStyles = makeStyles({
    container: {
        maxWidth: 600,
        maxHeight: '100%',
        overflowY: 'auto'
    },
    loaderContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    loader: {
        justifyContent: 'center',
    },
    image: {
        objectFit: 'contain'
    },
})