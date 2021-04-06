import Home from '../pages/home/index'
import Login from '../pages/login/index'

export default [
    {
        path:"/home" ,
        component: Home,
        exact: false
    },
    {
        path:"/login" ,
        component: Login,
        exact: true
    },
]
