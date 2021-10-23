import React,{useLayoutEffect} from 'react';
import {Route,Switch} from 'react-router';
import {CombinedRoutes} from '../routes/Routes'
import {useDispatch} from 'react-redux'
import { withRouter } from 'react-router';
import {setPageTitle} from '../store/theme/actions'
import Sidebar from "../pages/Common/Sidebar"
import FlowText from '../components/FlowText'
const getUrlElem = (url)=>{
    let urlSplit = url.split('/')
    let route = CombinedRoutes.filter(c=>c.link.split('/').length === urlSplit.length).find(c=>c.link.split('/').every((i,j) => i=[0] === ':' || i === urlSplit[j]));
    let urlParams = {};
    route?.link?.split('/').forEach((c,i) => {
        if(c[0] === ':'){
            urlParams[c.splice(1,)] = urlSplit[i];
        }
    })
    let {component : Elem = null,title = null ,ItemIcon : icon = null,saveData = false,multiWindow = false} = route || {}
    return {Elem,title,icon,saveData,multiWindow,urlParams}
}

const HomeRoot = ({history}) =>{
    const dispatch = useDispatch ()


    //set Page title
    useLayoutEffect (()=>{
        let path = getUrlElem(history.location.pathname)
        if(path)dispatch(setPageTitle(path.title))
    },[history.location])//eslint-disable-line

    return (
        <div className="h-full bg-bluegray-100 dark:bg-mainbg text-white flex">
            {/* <Sidebar /> */}
            <div className="w-full flex flex-col h-full">
                {/* <Topbar /> */}
                <FlowText text="topdar"/>
                <div className="text-left h-full overflow-auto pt-4 px-8 text-black dark:text-white">
                    <Switch>
                        {
                            CombinedRoutes.map(c => (
                                <Route key={ c.link } path={ c.link } exact component={ c.component } />
                            ))
                        }
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default withRouter(HomeRoot)