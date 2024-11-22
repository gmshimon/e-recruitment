import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Component/Navbar/Navbar'
import CurrentUser from '../utilis/CurrentUser'
// import { useDispatch } from 'react-redux'

const Main = () => {
//   const dispatch = useDispatch()
  const location = useLocation()
  const isLoginPage =
    location.pathname.includes('login') ||
    location.pathname.includes('register')
    CurrentUser()
    return (
    <div>
      {isLoginPage || <Navbar></Navbar>}
      <Outlet />
    </div>
  )
}

export default Main
