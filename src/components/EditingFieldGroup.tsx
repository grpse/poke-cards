import React from 'react'
import { EditingField } from "./EditingField"
import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'


export type EditingFieldGroupProps = {
    isEditing: boolean
    values: string[]
    onChange(newValues : string[]): void
}


export function EditingFieldGroup({ isEditing, values, onChange } : EditingFieldGroupProps) {
    
    const onChangeValue = (newValue : string, valueIndex : number) => {
        const valuesCopy = [...values]
        valuesCopy[valueIndex] = newValue
        onChange(valuesCopy)
    }

    const removeValue = (valueIndex : number) => {
        const valuesCopy = [...values]
        if (valuesCopy && valuesCopy.length) {
            valuesCopy.splice(valueIndex, 1)
            onChange(valuesCopy)
        }
    }

    const addNewValue = () => {
        const valuesCopy = [...values]
        valuesCopy.push('')
        onChange(valuesCopy)
    }

    return (
        <>
            {(values || []).map((value, index) => (
                <EditingField
                    key={index}
                    isEditing={isEditing}
                    value={value}
                    onChange={newValue => onChangeValue(newValue, index)}
                    onRemove={() => removeValue(index)}/>
            ))}
            {
                isEditing &&
                <IconButton onClick={addNewValue}>
                    <AddIcon />
                </IconButton>
            }
        </>
    )
}