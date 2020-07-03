import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { FilterToolbar } from './FilterToolbar'

test('changing filter param', (done) => {
    const newValueForFilter = '##SET NEW VALUE##'
    let filterParam = ''
    const onFilterChange = (newFilter : string) => {
        filterParam = newFilter
        if (filterParam === newValueForFilter) {
            done()
        }
    }

    const { container } = render(<FilterToolbar filterParam={filterParam} onFilter={onFilterChange} />)

    const inputFilter = container.querySelector('input')
    fireEvent.change(inputFilter, { target: { value: newValueForFilter } })
})

test('filled filter param', () => {

    let filterParam = '##SET NEW VALUE##'
    const onFilterChange = () => { }

    const { container } = render(<FilterToolbar filterParam={filterParam} onFilter={onFilterChange} />)

    const inputFilter = container.querySelector('input')
    expect(inputFilter.value).toBe(filterParam)
})