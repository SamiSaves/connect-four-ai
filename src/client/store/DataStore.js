import { observable, action } from 'mobx'

export default class DataStore {
  @observable games = []

  @observable currentGame

  @action
  getGames = async () => {
    const query = `
        query {
            getGames {
                _id
                name
                winner
                currentTurn
            }
        }
        `

    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const games = await result.json()

    this.games = games.data.getGames
  }

  @action
  getGame = async (id) => {
    const query = `
    query getGame($id: ID) {
      getGame(id: $id){
        _id
        name
        winner
        currentTurn
        pieces {
          color
          position {
            column
            row
          }
        }
      }
    }
      `

    const result = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query, variables: { id } }),
    })

    const game = await result.json()
    this.currentGame = game.data.getGame
  }
}
