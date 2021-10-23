import {ImHome} from 'react-icons/im'

import Dashboard from '../pages/Dashboard/Dashboard'
import AddStudents from '../pages/Students/AddStudents'
import EditStudents from '../pages/Students/EditStudents'
export const DashRoutes = [
    {
        title: 'Dashboard',
        ItemIcon : ImHome,
        link : '/',
        component:Dashboard
    } ,
    {
        title:'Add Students',
        link:'/addStudents',
        component:AddStudents,
    },
    {
        title:'Edit Students',
        link:'/editStudent/:id',
        component:EditStudents,
    }
]   

export const CombinedRoutes = [...DashRoutes]