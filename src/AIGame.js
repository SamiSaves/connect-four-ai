const ROWS = 6
const COLS = 7

class Piece {
    row
    col
    color

    constructor(col, row, color) {
        this.row = row
        this.col = col
        this.color = color
    }
}

export default class Game {
    pieces
    currentTurn

    constructor() {
        this.pieces = []
        this.currentTurn = 1
    }

    getConnectionValue(piece) {
        let connectionValue = 0
        let tempPiece
        let counter
        let nextToEnemy
        const reset = () => { tempPiece = piece; counter = 1}

        const directions = ['left', 'top', 'bottom', 'right', 'top-left', 'top-right', 'bottom-right', 'bottom-left']

        for (let i = 0; i < directions.length; i++) {
            reset()

            while(true) {
                tempPiece = this.getAdjacentPiece(directions[i], tempPiece)
                if (!tempPiece) break
                if (tempPiece.color !== piece.color) {
                    nextToEnemy = true
                    break
                }
                counter++
            }

            if (counter > connectionValue) connectionValue = counter
        }

        return { value: connectionValue, nextToEnemy }
    }

    getAdjacentPiece(dir, piece) {
        if (!piece) return
        switch(dir) {
            case 'left':
                return this.getPiece(piece.col-1, piece.row)
            case 'top':
                return this.getPiece(piece.col, piece.row-1)
            case 'right':
                return this.getPiece(piece.col+1, piece.row)
            case 'bottom':
                return this.getPiece(piece.col, piece.row+1)
            case 'top-left':
                return this.getPiece(piece.col-1, piece.row-1)
            case 'bottom-left':
                return this.getPiece(piece.col-1, piece.row+1)
            case 'top-right':
                return this.getPiece(piece.col+1, piece.row-1)
            case 'bottom-right':
                return this.getPiece(piece.col+1, piece.row+1)
        }
    }

    getPiece(col, row) {
        if (col >= COLS || row >= ROWS) return undefined
        else return this.pieces.find(piece => piece.row === row && piece.col === col)
    }

    placePiece (col) {
        const piecesOnCol = this.pieces.filter(piece => piece.col === col) || []
        if (piecesOnCol.length === ROWS) return  false
        
        const piece = new Piece(col, ROWS - piecesOnCol.length - 1, this.currentTurn)
        this.pieces.push(piece)

        this.currentTurn = -this.currentTurn

        return piece
    } 
}
