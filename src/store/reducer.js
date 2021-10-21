import { combineReducers } from 'redux'
import authReducers from './auth/reducers'
import themeReducers from './theme/reducers'


export const reducer = combineReducers({
    auth: authReducers,
    theme: themeReducers
})