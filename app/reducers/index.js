import { combineReducers } from 'redux';
import i18n from './i18n'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer,
  i18n
})

export default rootReducer