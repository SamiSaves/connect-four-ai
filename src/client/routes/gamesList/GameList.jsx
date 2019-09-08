import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

@inject((stores) => ({ dataStore: stores.dataStore }))
@observer
class GamesList extends React.Component {
  render() {
    const { dataStore } = this.props
    const { games } = dataStore

    return (
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
    )
  }
}

GamesList.propTypes = {
  dataStore: PropTypes.any,
  history: PropTypes.any,
}

export default GamesList
