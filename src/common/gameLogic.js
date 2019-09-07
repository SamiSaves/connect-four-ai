const maxRows = 6
const maxCols = 7
const directions = [
    'left',
    'top',
    'bottom',
    'right',
    'top-left',
    'top-right',
    'bottom-right',
    'bottom-left'
]

const placePiece = (game, column, color) => {
    if (column >= maxCols || column < 0) throw Error('Column out of board')

    const piecesOnColumn = game.pieces.filter(piece => piece.position.column === column).length
    if (piecesOnColumn >= maxRows) throw Error('Column is full')

    const piece = {
        position: {
            column,
            row: piecesOnColumn
        },
        color
    }

    game.pieces.push(piece)
    const isWinningMove = isWinner(game.pieces, piece)
    if (isWinningMove) game.winner = color
}

const getPiece = (pieces, { column, row }) => {
    return pieces.find(piece => piece.position.row === row && piece.position.column === column)
}

const getAdjacentPiece = (pieces, piece, dir) => {
    if (!piece) return

    const up = ({ row, column }) => ({ column, row: row + 1 })
    const down = ({ row, column }) => ({ column, row: row - 1 })
    const left = ({ row, column }) => ({ column: column + 1, row })
    const right = ({ row, column }) => ({ column: column - 1, row })

    switch (dir) {
        case 'left':
            return getPiece(pieces, left(piece.position))
        case 'top':
            return getPiece(pieces, up(piece.position))
        case 'right':
            return getPiece(pieces, right(piece.position))
        case 'bottom':
            return getPiece(pieces, down(piece.position))
        case 'top-left':
            return getPiece(pieces, up(left(piece.position)))
        case 'bottom-left':
            return getPiece(pieces, down(left(piece.position)))
        case 'top-right':
            return getPiece(pieces, up(right(piece.position)))
        case 'bottom-right':
            return getPiece(pieces, down(right(piece.position)))
    }
}

const isWinner = (pieces, piece) => {
    for (let i = 0; i < directions.length; i++) {
        let connectedPieces = 1
        let tempPiece = piece

        while (true) {
            tempPiece = getAdjacentPiece(pieces, tempPiece, directions[i])
            if (!tempPiece || tempPiece.color !== piece.color) break
            connectedPieces++
            if (connectedPieces === 4) return true
        }
    }

    return false
}

module.exports = { placePiece }
