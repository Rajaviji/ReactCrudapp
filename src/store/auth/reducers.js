import {SET_LOGGEDIN,SET_USER_DETAILS,SET_USER} from './constants'
import authStore from './store'

const authReducers = (state = authStore,action) =>{
    switch(action.type){
        case SET_LOGGEDIN : 
            return {...state,isLoggedIn:action.payload}
        case SET_USER_DETAILS : 
            return {...state,userDetails:action.payload}
        case SET_USER : 
            return {...state,user:action.payload}
        default :
            return state
    }   
}

export default authReducers