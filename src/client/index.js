import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import GameStore from './store/GameStore'

@observer
class FourInRow extends Component {
    render() {
        return (
            <div>
                {this.props.store.winner && <div>And the winner is {this.props.store.winner}</div>}
                <div className="grid">
                    {this.props.store.cells.map((cell, index) => {
                        let classes = ['cell']
                        if (cell.piece) classes.push(`piece-${cell.piece.color}`)
                        
                        return (
                            <div
                                key={`${cell.row}${cell.col}`}
                                className={classes.join(" ")}
                                onClick={() => this.props.store.placePiece(cell.col, !this.props.store.winner)}
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

const store = new GameStore();
ReactDOM.render(<FourInRow store={store} />, document.getElementById('app'));