const maxRows = 6
const maxCols = 7

const placePiece = (pieces, column, color) => {
    if (column >= maxCols || column < 0) throw Error('Column out of board')

    const piecesOnColumn = pieces.filter(piece => piece.position.col === column).length
    if (piecesOnColumn >= maxRows) throw Error('Column is full')

    const piecesCopy = JSON.parse(JSON.stringify(pieces))
    piecesCopy.push({
        position: {
            col: column,
            row: piecesOnColumn
        },
        color
    })

    return piecesCopy
} 

module.exports = { placePiece }
