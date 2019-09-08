import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject((stores) => ({ dataStore: stores.dataStore }))
@observer
class GamesList extends React.Component {
  render() {
    const { dataStore } = this.props
    const { games } = dataStore

    return (
      <div>
        {games.map((game) => (
          <div key={game._id}>{game.name}</div>
        ))}
      </div>
    )
  }
}

GamesList.propTypes = {
  dataStore: PropTypes.any,
}

export default GamesList
