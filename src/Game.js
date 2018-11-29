import aiMove from './ai'
import { computed, observable, action } from 'mobx';

const ROWS = 6
const COLS = 7

class Piece {
    @observable row
    @observable col
    @observable color

    constructor(col, row, color) {
        this.row = row
        this.col = col
        this.color = color
    }
}

export default class Game {
    @observable pieces
    @observable currentTurn

    constructor() {
        this.pieces = []
        this.currentTurn = 'red'
    }

    @computed get cells () {
        const cells = []
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const piece = this.pieces.find(piece => piece.row === row && piece.col === col)
                cells.push({
                    piece,
                    col,
                    row
                })
            }
        }
        return cells
    }

    @computed get winner() {
        for (let p = 0; p < this.pieces.length; p++) {
            const piece = this.pieces[p]

            if(this.getConnectionValue(piece) >= 4) return piece.color
        }
    }

    getConnectionValue(piece) {
        let connectionValue = 0
        let tempPiece
        let counter
        const reset = () => { tempPiece = piece; counter = 1}

        const directions = ['left', 'top', 'bottom', 'right', 'top-left', 'top-right', 'bottom-right', 'bottom-left']

        for (let i = 0; i < directions.length; i++) {
            reset()

            while(tempPiece) {
                tempPiece = this.getAdjacentPiece(directions[i], tempPiece)
                if (tempPiece && tempPiece.color === piece.color) counter++
                else if (tempPiece) break
            }

            if (counter > connectionValue) connectionValue = counter
        }

        return connectionValue
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

    @action placePiece (col, isAIMove) {
        const piecesOnCol = this.pieces.filter(piece => piece.col === col) || []
        if (piecesOnCol.length === ROWS) return  false
        
        const piece = new Piece(col, ROWS - piecesOnCol.length - 1, this.currentTurn)
        this.pieces.push(piece)

        if (this.currentTurn === 'red') this.currentTurn = 'blue'
        else this.currentTurn = 'red'

        if (isAIMove) aiMove(this)
        return piece
    } 
}
