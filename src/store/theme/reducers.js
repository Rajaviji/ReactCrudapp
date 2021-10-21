import { SET_ALERT, SET_ANIMATE, SET_LOADING, SET_PAGE_TITLE, SET_SIDEBAR, SET_THEME } from './constants'
import themeStore from './store'

const themeReducers = (state= themeStore, action) => {
    switch (action.type) {
        case SET_THEME:
            return {...state, themeMode: action.payload}
        case SET_ALERT:
            return {...state, alert: {...state.alert, ...action.payload}}
        case SET_PAGE_TITLE:
            return {...state, pageTitle: action.payload}
        case SET_LOADING:
            return {...state, loading: action.payload}
        case SET_SIDEBAR:
            return {...state, sideBar: action.payload}
        case SET_ANIMATE:
            return {...state, animate: action.payload}
        default:
            return state
    }
}

export default themeReducers
