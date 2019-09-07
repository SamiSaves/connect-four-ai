import { computed, observable, action } from 'mobx';

export default class DataStore {
    @observable games = []
    
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
        const result = await fetch(`http://localhost:3000/graphql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ query })
          })

        const games = await result.json()

        this.games = games.data.getGames
    }
}
