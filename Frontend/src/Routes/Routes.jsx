import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import Home from '../Pages/Home/Home'
import Jobs from '../Pages/Jobs/Jobs'
import Login from '../Pages/Login/Login'
import Registration from '../Pages/Registration/Registration'

export const router = createBrowserRouter([
    {
        path: '/',
        element:<Main/>,
        children:[
            {
                path: '/',
                element:<Home/>
            },
            {
                path:'/jobs',
                element:<Jobs/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Registration/>
            }
        ]
    }
])