import { combineReducers } from 'redux'
import { scrollReducer } from './scroll'

export const rootReducer = combineReducers({
  scroll: scrollReducer,
});