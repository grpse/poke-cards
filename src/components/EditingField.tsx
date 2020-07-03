import React from 'react'
import { Chip, OutlinedInput, makeStyles, IconButton } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'

export type EditingFieldProps = {
    isEditing: boolean
    value: string
    onChange(newValue : string): void
    onRemove(): void
    placeholder: string
}

export function EditingField({ isEditing, value, onChange, onRemove, placeholder } : EditingFieldProps) {
    
    const classes = useStyles()

    return (
        isEditing ?
            <>
                <OutlinedInput
                    value={value}
                    onChange={event => onChange(event.target.value)}
                    placeholder={placeholder}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }} />
                <IconButton onClick={() => onRemove()} className={classes.removeButton}>
                    <RemoveIcon />
                </IconButton>
            </>
            :
            <Chip label={value} variant='outlined' />
    )
}

const useStyles = makeStyles({
    inputRoot: {
        borderRadius: 30
    },
    inputInput: {
        height: 0,
        fontSize: '0.8125rem'
    },
    removeButton: {
        color: 'red'
    }
})