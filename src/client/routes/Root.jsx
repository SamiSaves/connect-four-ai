import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GamesList from './gamesList'

const Root = () => (
  <div>
    <div>HEADER</div>
    <Switch>
      <Route exact path="/" component={GamesList} />
    </Switch>
  </div>
)

export default Root
