import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import GamesList from './gamesList/GameList'
import Navigation from './common/navigation'
import GameView from './gameView'

const Root = (props) => (
  <div>
    <Navigation />
    <Paper className={props.classes.contentArea}>
      <Switch>
        <Route exact path="/" component={GamesList} />
        <Route path="/game/:gameid" component={GameView} />
      </Switch>
    </Paper>
  </div>
)

Root.propTypes = {
  classes: PropTypes.object,
}

const styles = {
  contentArea: {
    marginTop: '70px',
    padding: '20px',
  },
}

export default withStyles(styles)(Root)
