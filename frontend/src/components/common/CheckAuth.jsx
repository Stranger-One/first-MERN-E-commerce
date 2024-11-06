import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ children }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated) 
    const userData = useSelector(state => state.auth.userData) 
    const location = useLocation()

    if(!isAuthenticated && !(location.pathname.includes("auth") )){
        return <Navigate to='/auth/login' />
    }

    if(isAuthenticated && (location.pathname.includes("auth") )){
        if(userData?.role === "admin"){
            return <Navigate to='/admin/dashboard' />
        } else {
            return <Navigate to='/user/home' />
        }
    }

    if(isAuthenticated && userData?.role !== "admin" && location.pathname.includes("admin")){
        return <Navigate to='/unauth-page' />
    }

    if(isAuthenticated && userData?.role === "admin" && location.pathname.includes("user")){
        return <Navigate to='/admin/dashboard' />
    }


  return (
    <>{children}</>
  )
}

export default CheckAuth