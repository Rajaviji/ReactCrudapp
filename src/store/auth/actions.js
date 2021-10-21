import {SET_LOGGEDIN,SET_USER_DETAILS,SET_USER} from './constants'; //importing the exported type from the constants file

//These are all the default stores to store the values instead of using the localhost.

//setLoggedIn function maintain the token and state of the user whether the user is logged in or not
export const setLoggedIn = value => {
    if(!value) {
        localStorage.removeItem('token')
    }
    return {
        type: SET_LOGGEDIN,
        payload: value
    }
}

//setUserDetails function maintain the details of the user who is logged in
export const setUserDetails = value => {
    return {
        type: SET_USER_DETAILS,
        payload: value
    }
}

export const setUser = value => {
    return{
        type:SET_USER,
        payload:value
    }
}