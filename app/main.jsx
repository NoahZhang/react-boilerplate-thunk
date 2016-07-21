import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from './Common/containers/AppContainer'
import { testStore } from './store/testStore'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './main.css'

const store = testStore()

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={AppContainer}>
			</Route>
		</Router>
	</Provider>,
  document.getElementById('root')
)
