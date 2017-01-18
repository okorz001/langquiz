import React, {PropTypes} from 'react'

// range(1): [0]
// range(4): [0, 1, 2, 3]
function range(limit) {
    if (limit < 1) return []
    const arr = []
    for (let i = 0; i < limit; ++i) arr.push(i)
    return arr
}

function renderHeaders(columns, onClick) {
    return columns.map((column, i) =>
        <th key={i} data-col={i} onClick={onClick}>{column.label}</th>
    )
}

function renderRows(data, keys) {
    return data.map((datum, i) => {
        const values = keys.map((key, j) =>
            <td key={j}>{datum[key]}</td>
        )
        return <tr key={i}>{values}</tr>
    })
}

function compareStrings(a, b) {
    a = a.toString()
    b = b.toString()
    return a.localeCompare(b)
}

// Math.sign is apparently not portable
function compareNumbers(a, b) {
    a = +a
    b = +b
    return a < b ? -1 : (a > b ? 1 : 0)
}

function getSortMethod(sort) {
    if (typeof sort === "function") return sort
    switch (sort) {
        case "string":
            return compareStrings
        case "number":
            return compareNumbers
    }
    // ?!?!
    console.error(sort)
}

function sortData(column, key, data) {
    if (!column || !column.sort) return data
    const sortMethod = getSortMethod(column.sort, key)
    // Array.sort modifies in place, so shallow copy with slice first
    return data.slice().sort((a, b) => sortMethod(a[key], b[key]))
}

class SortableTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Set default sort
            sort: props.sort,
            reverse: false,
        }

        this.onHeaderClick = event => {
            event.preventDefault()
            const sort = +event.target.dataset.col
            this.setState(state => {
                // If sort is the same as before, flip it
                if (state.sort == sort) {
                    return {reverse: !state.reverse}
                }
                return {sort, reverse: false}
            })
        }
    }

    render() {
        const {sort, reverse} = this.state
        const {columns, data, properties} = this.props
        const width = columns.length
        const keys = properties || range(width)

        const sortedData = sortData(columns[sort], keys[sort], data)
        if (reverse) sortedData.reverse()

        const headers = renderHeaders(columns, this.onHeaderClick)
        const rows = renderRows(sortedData, keys) 

        return (
            <table>
                <thead>
                    <tr>
                        {headers}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

const columnShape = PropTypes.shape({
    label: PropTypes.string.isRequired,
    sort: PropTypes.oneOfType([
        PropTypes.oneOf(['string', 'number']),
        PropTypes.func,
    ]),
})

SortableTable.propTypes = {
    columns: PropTypes.arrayOf(columnShape).isRequired,
    sort: PropTypes.number,
    data: PropTypes.array.isRequired,
    properties: PropTypes.arrayOf(PropTypes.string),
}

export default SortableTable
