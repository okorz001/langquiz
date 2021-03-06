import React, {PropTypes} from 'react'

// range(1): [0]
// range(4): [0, 1, 2, 3]
function range(limit) {
    if (limit < 1) return []
    const arr = []
    for (let i = 0; i < limit; ++i) arr.push(i)
    return arr
}

function renderHeaders(columns, sort, reverse, onClick) {
    return columns.map((column, i) => {
        const sortable = column.sort != null
        const css = []
        if (sortable) css.push('sortable')
        if (i == sort) css.push('selected')
        if (i == sort && reverse) css.push('reversed')
        return (
            <th key={i} data-col={i}
                className={css.join(' ')}
                onClick={sortable ? onClick : null}>
                {column.label}
            </th>
        )
    })
}

function renderRows(columns, keys, data) {
    return data.map((datum, i) => {
        const values = keys.map((key, j) => {
            // TODO: dual iteration is a design smell
            const render = columns[j].render || (s => s)
            return <td key={j}>{render(datum[key])}</td>
        })
        return <tr key={i}>{values}</tr>
    })
}

export function compareStrings(a, b) {
    a = a.toString()
    b = b.toString()
    return a.localeCompare(b)
}

// Math.sign is apparently not portable
export function compareNumbers(a, b) {
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
            this.setState((state, props) => {
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
        const {className, columns, data, properties} = this.props
        const width = columns.length
        const keys = properties || range(width)

        const sortedData = sortData(columns[sort], keys[sort], data)
        if (reverse) sortedData.reverse()

        const headers = renderHeaders(columns, sort, reverse,
                                      this.onHeaderClick)
        const rows = renderRows(columns, keys, sortedData)

        return (
            <table className={className}>
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
    render: PropTypes.func,
})

SortableTable.propTypes = {
    className: PropTypes.string,
    columns: PropTypes.arrayOf(columnShape).isRequired,
    sort: PropTypes.number,
    data: PropTypes.array.isRequired,
    properties: PropTypes.arrayOf(PropTypes.string),
}

export default SortableTable
