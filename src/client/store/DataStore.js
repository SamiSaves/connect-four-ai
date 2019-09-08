import { observable, action, computed } from 'mobx'
import { maxCols, maxRows } from '../../common/gameLogic'

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

  @computed
  get cells() {
    if (!this.currentGame) return []
    const boardCells = []

    for (let column = 0; column < maxCols; column++) {
      for (let row = 0; row < maxRows; row++) {
        const piece = this.currentGame.pieces.find(({ position }) => position.column === column && position.row === row)
        if (!piece) {
          boardCells.push({ column, row, color: 'empty' })
          continue
        }

        boardCells.push({ ...piece.position, color: piece.color })
      }
    }

    return boardCells
  }
}
