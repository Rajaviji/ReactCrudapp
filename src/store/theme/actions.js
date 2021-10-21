import { SET_ALERT, SET_ANIMATE, SET_LOADING, SET_PAGE_TITLE, SET_SIDEBAR, SET_THEME } from "./constants"

//SetTheme function will manage the theme of the project whether it is light or dark

export const setTheme = value => {
    localStorage.setItem('theme', value)
    if(value === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    return {
        type: SET_THEME,
        payload: value
    }
}

//setAlert function is used to alert the user based on the status of the action what he/she performed

export const setAlert = value => ({type: SET_ALERT, payload: value})

//setPageTitle function is used to set the title of the page

export const setPageTitle = value => {
    document.title = value
    return {type: SET_PAGE_TITLE, payload: value}
}

//setLoading function is used to set the loading for the page untill all the elements are loaded in the page

export const setLoading = value => ({type: SET_LOADING, payload: value})
//set sidebar function is used to enable the hide and show operation
export const setSidebar = value => ({type: SET_SIDEBAR, payload: value})
//setanimate function is used to whether you can on or off the animation in the website
export const setAnimate = value => {
    localStorage.setItem('animate', value)
    return {type: SET_ANIMATE, payload: value || value === 'true'}
}