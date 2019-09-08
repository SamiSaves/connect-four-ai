import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'

@inject((stores) => ({ dataStore: stores.dataStore }))
@observer
class GameView extends React.Component {
  form = new ScriptForm()

  async componentDidMount() {
    await this.props.dataStore.getGame(this.props.match.params.gameid)
  }

  onInputChange = ({ target }) => {
    this.form.script = target.value
  }

  executeScript = () => {
    let column
    try {
      // eslint-disable-next-line no-eval
      column = eval(`(() => { ${this.form.script} })()`)
      if (typeof column !== 'number') {
        throw Error('Error: Method did not return a number')
      }
    } catch (error) {
      console.error('Scrpit execution failed:', error)
      return
    }

    this.props.dataStore.insertPiece(column)
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
        <div className={this.props.classes.form}>
          <TextField
            label="Script"
            multiline
            rows="4"
            variant="outlined"
            onChange={this.onInputChange}
            value={this.form.script}
          />
          <Button onClick={this.executeScript}>Execute</Button>
        </div>
      </div>
    )
  }
}

class ScriptForm {
  @observable script = ''
}

GameView.propTypes = {
  classes: PropTypes.object,
  dataStore: PropTypes.object,
  match: PropTypes.object,
}

const styles = {
  form: {
    marginTop: 30,
  },
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
