import {ImHome} from 'react-icons/im'

import Dashboard from '../pages/Dashboard/Dashboard'
export const DashRoutes = [
    {
        title: 'Dashboard',
        ItemIcon : ImHome,
        link : '/',
        component:Dashboard
    }   
]   

export const CombinedRoutes = [...DashRoutes]