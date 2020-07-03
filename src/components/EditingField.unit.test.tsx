import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { EditingField } from './EditingField'

test('Without editing field should display value', () => {
    const value = '##VALUE##'
    const emptyOnChange = () => {}
    const emptyOnRemove = () => {}
    const { getByText } = render(<EditingField placeholder='placeholder' isEditing={false} value={value} onChange={emptyOnChange} onRemove={emptyOnRemove} />)

    expect(getByText(value)).toBeInTheDocument()
})

test('Changing the value and receiving new one', (done) => {
    const value = '##VALUE##'
    const newValue = '###SET NEW VALUE###'
    const OnChange = (newValueOnChange : string) => {
        if (newValueOnChange === newValue) {
            done()
        } else {
            throw new Error('Value not changed')
        }
    }

    const emptyOnRemove = () => {}
    const { container } = render(<EditingField isEditing={true} placeholder={'placeholder'} value={value} onChange={OnChange} onRemove={emptyOnRemove} />)

    const input = container.querySelector('input')
    fireEvent.change(input, { target: { value: newValue }})
})

test('removing event on field', (done) => {
    const value = '##VALUE##'
    const emptyOnChange = () => {}
    const OnRemove = done
    const { container } = render(<EditingField isEditing={true} placeholder={'placeholder'} value={value} onChange={emptyOnChange} onRemove={OnRemove} />)

    const button = container.querySelector('button')
    const leftClick = { button: 0 }

    fireEvent.click(button, leftClick)
})