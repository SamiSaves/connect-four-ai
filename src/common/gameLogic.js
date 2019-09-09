const maxRows = 6
const maxCols = 7

const placePiece = (game, column, color) => {
  if (column >= maxCols || column < 0) throw Error('Column out of board')

  const piecesOnColumn = game.pieces.filter((piece) => piece.position.column === column).length
  if (piecesOnColumn >= maxRows) throw Error('Column is full')

  const piece = {
    position: {
      column,
      row: piecesOnColumn,
    },
    color,
  }

  game.pieces.push(piece)
  const isWinningMove = isWinner(game.pieces, piece)
  if (isWinningMove) game.winner = color
  game.currentTurn = color === 'red' ? 'blue' : 'red'
}

const getPiece = (pieces, { column, row }) => (
  pieces.find((piece) => piece.position.row === row && piece.position.column === column)
)

const getInRowCount = (pieces, piece, dir) => {
  let val = 0
  let nextPiece = getPiece(pieces, dir(piece.position))

  while (nextPiece && nextPiece.color === piece.color) {
    val++
    nextPiece = getPiece(pieces, dir(nextPiece.position))
  }

  return val
}

const isWinner = (pieces, piece) => {
  const up = ({ row, column }) => ({ column, row: row + 1 })
  const down = ({ row, column }) => ({ column, row: row - 1 })
  const left = ({ row, column }) => ({ column: column + 1, row })
  const right = ({ row, column }) => ({ column: column - 1, row })

  // Check horizontal
  let inRow = 1
  inRow += getInRowCount(pieces, piece, right)
  inRow += getInRowCount(pieces, piece, left)
  if (inRow >= 4) return true

  // Check vertical
  inRow = 1
  inRow += getInRowCount(pieces, piece, up)
  inRow += getInRowCount(pieces, piece, down)
  if (inRow >= 4) return true

  // Check /
  inRow = 1
  inRow += getInRowCount(pieces, piece, (position) => up(right(position)))
  inRow += getInRowCount(pieces, piece, (position) => down(left(position)))
  if (inRow >= 4) return true

  // Check \
  inRow = 1
  inRow += getInRowCount(pieces, piece, (position) => up(left(position)))
  inRow += getInRowCount(pieces, piece, (position) => down(right(position)))
  if (inRow >= 4) return true

  return false
}

module.exports = { placePiece, maxCols, maxRows }
