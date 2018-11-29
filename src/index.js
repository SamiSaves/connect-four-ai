import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import Game from './Game'

@observer
class FourInRow extends Component {
    render() {
        return (
            <div>
                {this.props.game.winner && <div>And the winner is {this.props.game.winner}</div>}
                <div className="grid">
                    {this.props.game.cells.map((cell, index) => {
                        let classes = ['cell']
                        if (cell.piece) classes.push(`piece-${cell.piece.color}`)
                        
                        return (
                            <div
                                key={`${cell.row}${cell.col}`}
                                className={classes.join(" ")}
                                onClick={() => this.props.game.placePiece(cell.col, !this.props.game.winner)}
                                style={{
                                    left: cell.col * 55 + 'px',
                                    top: cell.row * 55 + 'px'
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

const store = new Game();
ReactDOM.render(<FourInRow game={store} />, document.getElementById('app'));