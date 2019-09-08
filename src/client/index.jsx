import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider as MobxProvider } from 'mobx-react'
import Root from './routes/Root'
import DataStore from './store/DataStore'

const dataStore = new DataStore()
dataStore.getGames()

const App = () => (
  <BrowserRouter>
    <MobxProvider dataStore={dataStore}>
      <Root />
    </MobxProvider>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('app'))
