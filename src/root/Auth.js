import { useDispatch,useSelector } from "react-redux"
import {useEffect,useState} from 'react'
import {setLoggedIn,setUserDetails} from '../store/auth/actions'
import {withRouter} from 'react-router'
import IntroLoader from "../components/IntroLoader"


const Auth = ({children,history}) =>{

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const [isLoggedChecked,setIsLoggedChecked] = useState(false)

    const dispatch = useDispatch()
    
    const chkLoggedIn = ()=>{
        let token = localStorage.getItem('token')
        if(!token && isLoggedIn){
            dispatch(setLoggedIn(false))
        }else if(token && token.split('.').length >1){
            let userDetails = JSON.parse(atob(token.split('.')[1]));
            dispatch(setUserDetails(userDetails))
            dispatch(setLoggedIn(true))
        }
        setIsLoggedChecked(true)
    }

    useEffect(() => {
        if(!isLoggedIn){
            chkLoggedIn()
            if(history.location.pathname !== '/login')history.push('/login')
        }else if(history.location.pathname === '/login') history.push('/')
    },[isLoggedIn])// eslint-disable-line


    useEffect(() => {
        chkLoggedIn()
    }, []) // eslint-disable-line

    return(
        <>
            {
                isLoggedChecked ? <>{children}</> :<IntroLoader/>
            }
        </>
    )
}

export default withRouter(Auth)