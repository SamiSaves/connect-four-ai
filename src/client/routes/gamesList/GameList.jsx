import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

@inject((stores) => ({ dataStore: stores.dataStore }))
@observer
class GamesList extends React.Component {
  form = new NewGameForm()

  onInputChange = ({ target }) => {
    this.form.name = target.value
  }

  createGame = async () => {
    if (this.form.name) {
      console.log("Hmm")
      await this.props.dataStore.createGame(this.form.name)
    }
  }

  render() {
    const { dataStore } = this.props
    const { games } = dataStore

    return (
      <div>
        <div>
          <TextField
            onChange={this.onInputChange}
            value={this.form.name}
          />
          <Button
            className={this.props.classes.createButton}
            onClick={this.createGame}
          >
            Create game
          </Button>
        </div>
        <List>
          {games.map((game) => {
            const statusText = game.winner ? `Game is over (winner: ${game.winner})` : `Current turn: ${game.currentTurn}`
            return (
              <ListItem
                button
                key={game._id}
                onClick={() => { this.props.history.push(`/game/${game._id}`) }}
                href={`/game/${game._id}`}
              >
                <ListItemText
                  primary={game.name}
                  secondary={statusText}
                />
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}

class NewGameForm {
  @observable name = ''
}

GamesList.propTypes = {
  classes: PropTypes.any,
  dataStore: PropTypes.any,
  history: PropTypes.any,
}

const styles = {
  createButton: {
    marginLeft: 10,
  },
}

export default withStyles(styles)(GamesList)
