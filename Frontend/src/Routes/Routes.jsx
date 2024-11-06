import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import Home from '../Pages/Home/Home'
import Jobs from '../Pages/Jobs/Jobs'

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
            }
        ]
    }
])