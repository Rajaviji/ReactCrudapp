import { Route, Switch } from "react-router"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from "../pages/Login"
import Auth from "./Auth"
import HomeRoot from "./HomeRoot"
import { setAlert, setAnimate, setLoading, setTheme } from "../store/theme/actions"
// import Alert from "../components/Alert"
// import Loading from "../components/snippets/Loading"
import API from "../axios/API"
// import ResetPassword from "../pages/ResetPassword"

const Root = () => {

    const {themeMode, alert, loading} = useSelector(state => state.theme)

    const dispatch = useDispatch()

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    const setHideAlert = () => dispatch(setAlert({active: false}))

    useEffect(() => {
        let localTheme = localStorage.getItem('theme')
        if(localTheme && localTheme !== themeMode) {
            if(localTheme === 'light' || localTheme === 'dark') {
                dispatch(setTheme(localTheme))
                return
            }
        }
        dispatch(setTheme(prefersDarkMode))
        // animate
        let animate = localStorage.getItem('animate')
        if(animate === 'false') dispatch(setAnimate(false))
    }, [prefersDarkMode]) // eslint-disable-line
    useEffect(() => {
        // adding interceptors to api
        API.interceptors.request.use(request => {
            dispatch(setLoading(true))
            return request
        })
        API.interceptors.response.use(
            response => {
                dispatch(setLoading(false))
                return response
            },
            error => {
                dispatch(setLoading(false))
                return Promise.reject(error)
            }
        )
    }, []) // eslint-disable-line

    return (
        <Auth>
            <div className="h-full">
                {/* { loading && <Loading /> } */}
                {/* <Alert title={ alert.title } subtitle={ alert.subtitle } active={ alert.active } setActive={ setHideAlert } type={alert.type}/> */}
                <Switch>
                    <Route path="/login" exact component={ Login } />
                    {/* <Route path="/reset/:token" exact component={ ResetPassword } /> */}
                    <Route path="" component={ HomeRoot } />
                </Switch>
            </div>
        </Auth>
    )
}

export default Root