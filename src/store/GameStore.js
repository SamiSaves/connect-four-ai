import Game from '../models/Game'
import PieceModel from '../models/Piece'
import aiMove from '../ai'
import { computed, observable, action } from 'mobx';

class Piece extends PieceModel {
    @observable row
    @observable col
    @observable color

    constructor(col, row, color) {
        super(col, row, color)
    }
}

export default class GameStore extends Game {
    @observable pieces
    @observable currentTurn

    constructor() {
        super()
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

    @action placePiece (col, isAIMove) {
        super.placePiece(col)
        if (isAIMove) aiMove(this)
    } 
}
