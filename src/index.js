import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import { computed, observable, action } from 'mobx';

const ROWS = 6
const COLS = 7

@observer
class FourInRow extends Component {
    render() {
        return (
            <div className="grid">
                {this.props.game.cells.map((cell, index) => {
                    let classes = ['cell']
                    if (cell.piece) classes.push(`piece-${cell.piece.color}`)
                    
                    return (
                        <div
                            key={`${cell.row}${cell.col}`}
                            className={classes.join(" ")}
                            onClick={() => this.props.game.placePiece(cell.col)}
                            style={{
                                left: cell.col * 55 + 'px',
                                top: cell.row * 55 + 'px'
                            }}
                        />
                    )
                    // row 0, col 6
                })}
            </div>
        )
    }
}

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

class Game {
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

    getWinner() {
        for (let p = 0; p < this.pieces.length; p++) {
            const piece = this.pieces[p]

            let tempPiece
            let counter
            const reset = () => { tempPiece = piece; counter = 1}

            const directions = ['left', 'top', 'bottom', 'right', 'top-left', 'top-right', 'bottom-right', 'bottom-left']

            for (let i = 0; i < directions.length; i++) {
                reset()

                while(tempPiece) {
                    tempPiece = this.getAdjacentPiece(directions[i], tempPiece)
                    if (tempPiece && tempPiece.color === piece.color) counter++
                    if (counter > 3) console.log(counter)
                    if (counter === 4) return piece.color
                }
            }
        }
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

    @action placePiece (col) {
        const piecesOnCol = this.pieces.filter(piece => piece.col === col) || []
        if (piecesOnCol.length === ROWS) return console.warn("This row is already full D:")
        
        this.pieces.push(new Piece(col, ROWS - piecesOnCol.length - 1, this.currentTurn))

        if (this.currentTurn === 'red') this.currentTurn = 'blue'
        else this.currentTurn = 'red'

        const winner = this.getWinner()
        if (winner) console.log("WE HAVE A WINNDER! ", winner)
    } 
}

const store = new Game();
ReactDOM.render(<FourInRow game={store} />, document.getElementById('app'));