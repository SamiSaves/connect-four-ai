import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GamesList from './gamesList'
import Navigation from './common/navigation'

const Root = () => (
  <div>
    <Navigation />
    <div>
      <Switch>
        <Route exact path="/" component={GamesList} />
      </Switch>
    </div>
  </div>
)

export default Root
