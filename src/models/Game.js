import Piece from './Piece'

export default class Game {
    static ROWS = 6
    static COLS = 7
    static directions = [
        'left',
        'top',
        'bottom',
        'right',
        'top-left',
        'top-right',
        'bottom-right',
        'bottom-left'
    ]

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
        const reset = () => {
            tempPiece = piece;
            counter = 1
        }

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
