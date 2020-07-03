import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { EditingFieldGroup } from './EditingFieldGroup'

test('fields with no value should be empty', () => {
    const isEditing = false
    const values: string[] = []
    const onChange = () => { }
    const placeholder = ''

    const { container } = render(<EditingFieldGroup isEditing={isEditing} placeholder={placeholder} values={values} onChange={onChange} />)

    expect(container).toMatchInlineSnapshot('<div />')
})

test('values on editing fields edit one', (done) => {
    const isEditing = true
    const values: string[] = ['##VALUE1##', '##VALUE2##']
    const newValueForFirst = '##SET NEW VALUE 1##'
    const onChange = (newValues: string[]) => {
        if (newValues[0] === newValueForFirst) {
            done()
        } else {
            throw new Error('New value change doesn\'t match')
        }
    }
    const placeholder = ''

    const { container } = render(<EditingFieldGroup isEditing={isEditing} placeholder={placeholder} values={values} onChange={onChange} />)

    const firstInputField = container.querySelector('input')
    fireEvent.change(firstInputField, { target: { value: newValueForFirst } })
})

test('adding a new value', (done) => {
    const isEditing = true
    const values: string[] = ['##VALUE1##', '##VALUE2##']

    const onChange = (newValues: string[]) => {

        if (newValues[2] === '') {
            done()
        } else {
            throw new Error('New value change doesn\'t match')
        }
    }
    const placeholder = ''

    const { container } = render(<EditingFieldGroup isEditing={isEditing} placeholder={placeholder} values={values} onChange={onChange} />)

    const allButtons = container.querySelectorAll('button')
    const addMoreValuesButton = allButtons[allButtons.length - 1]
    const leftClick = { button: 0 }
    fireEvent.click(addMoreValuesButton, leftClick)
})

test('adding a new value and change it', async (done) => {
    const isEditing = true
    let values: string[] = ['##VALUE1##', '##VALUE2##']
    const newValueSet = '###SET NEW VALUE###'
    const onChange = (newValues: string[]) => {
        if (newValues[2] === '') {
            values = newValues
        } else if (newValues[2] === newValueSet) {
            done()
        } else {
            throw new Error('New value change doesn\'t match')
        }
    }
    const placeholder = ''

    const { container, rerender } = render(<EditingFieldGroup isEditing={isEditing} placeholder={placeholder} values={values} onChange={onChange} />)

    const addMoreValuesButton = container.querySelector('button:nth-of-type(3)')
    const leftClick = { button: 0 }

    fireEvent.click(addMoreValuesButton, leftClick)

    rerender(<EditingFieldGroup isEditing={isEditing} placeholder={placeholder} values={values} onChange={onChange} />)

    const inputElements = container.querySelectorAll('input')
    const lastEditingFieldAdded = inputElements[inputElements.length - 1]

    fireEvent.change(lastEditingFieldAdded, { target: { value: newValueSet } })
})

test('removing one value', async (done) => {
    const isEditing = true
    let values: string[] = ['##VALUE1##', '##VALUE2##']

    const onChange = (newValues: string[]) => {
        if (newValues.length === 1 && values[0] === newValues[0]) {
            done()
        } else {
            throw new Error('New value change doesn\'t match')
        }
    }
    const placeholder = ''

    const { container } = render(<EditingFieldGroup isEditing={isEditing} placeholder={placeholder} values={values} onChange={onChange} />)

    const removeEditingField2 = container.querySelector('button:nth-of-type(2)')
    const leftClick = { button: 0 }

    fireEvent.click(removeEditingField2, leftClick)


})

test('removing all values', async (done) => {
    const isEditing = true
    let values: string[] = ['##VALUE1##', '##VALUE2##']

    const onChange = (newValues: string[]) => {
        values = newValues
        if (newValues.length === 0) {
            done()
        }
    }
    const placeholder = ''

    const { container, rerender } = render(<EditingFieldGroup isEditing={isEditing} placeholder={placeholder} values={values} onChange={onChange} />)

    let removeButton = container.querySelector('button[name="remove-value-button"]')
    while(removeButton) {
        const leftClick = { button: 0 }
        fireEvent.click(removeButton, leftClick)
        rerender(<EditingFieldGroup isEditing={isEditing} placeholder={placeholder} values={values} onChange={onChange} />)
        removeButton = container.querySelector('button[name="remove-value-button"]')
    }
})

test('show values when not editing', () => {
    const isEditing = false
    let values: string[] = ['##VALUE1##', '##VALUE2##']

    const onChange = () => { }
    const placeholder = ''

    const { getByText } = render(<EditingFieldGroup isEditing={isEditing} placeholder={placeholder} values={values} onChange={onChange} />)

    for (const value of values) {
        const element = getByText(value)
        expect(element.textContent).toBe(value)
    }
})