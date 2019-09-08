import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject((stores) => ({ dataStore: stores.dataStore }))
@observer
class GameView extends React.Component {
  async componentDidMount() {
    await this.props.dataStore.getGame(this.props.match.params.gameid)
  }

  render() {
    return (
      <div>{ JSON.stringify(this.props.dataStore.currentGame) }</div>
    )
  }
}

GameView.propTypes = {
  dataStore: PropTypes.object,
  match: PropTypes.object,
}

export default GameView
