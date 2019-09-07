import React from 'react'
import { inject, observer } from 'mobx-react'

@inject(stores => ({ dataStore: stores.dataStore }))
@observer
export default class GamesList extends React.Component {
    render() {
        const games = this.props.dataStore.games

        return (
            <div>
                {games.map(game => (
                    <div key={game._id}>{game.name}</div>
                ))}
            </div>
        )
    }
}
