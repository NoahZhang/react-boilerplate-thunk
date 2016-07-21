import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import { Router, useRouterHistory, browserHistory } from 'react-router'

export function jiceStore() {
  const store = compose(
    applyMiddleware(thunk, routerMiddleware(browserHistory))
  )(createStore)(rootReducer)

  return store
}
