import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'

@inject((stores) => ({ dataStore: stores.dataStore }))
@observer
class GameView extends React.Component {
  async componentDidMount() {
    await this.props.dataStore.getGame(this.props.match.params.gameid)
  }

  render() {
    const { dataStore } = this.props

    return (
      <div>
        <div className={this.props.classes.board}>
          {dataStore.cells.map((piece) => (
            <div
              className={
                `${this.props.classes.cell} ${this.props.classes[piece.color]}`
              }
              key={`${piece.column}-${piece.row}`}
              style={{
                top: `calc((41vmin - (${piece.row + 1} * (41vmin / 6))) + 1vmin)`,
                left: `calc((${piece.column} * (41vmin / 7)) + 1vmin)`,
              }}
            />
          ))}
        </div>
        <div>{ JSON.stringify(this.props.dataStore.currentGame) }</div>
        <div>Script field</div>
      </div>
    )
  }
}

GameView.propTypes = {
  classes: PropTypes.object,
  dataStore: PropTypes.object,
  match: PropTypes.object,
}

const styles = {
  board: {
    position: 'relative',
    width: '41vmin',
    height: '41vmin',
    backgroundColor: '#00C',
    padding: '5px',
  },
  cell: {
    position: 'absolute',
    width: 'calc(40vmin / 7 - 5px)',
    height: 'calc(40vmin / 7 - 5px)',
    borderRadius: '40px',
  },
  red: {
    backgroundColor: '#C00',
  },
  blue: {
    backgroundColor: '#1E90FF',
  },
  empty: {
    backgroundColor: '#AAA',
  },
}

export default withStyles(styles)(GameView)
