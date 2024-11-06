import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='w-full h-screen grid grid-cols-2'>
      <div className="bg-slate-800 flex items-center justify-center">
        <h1 className='text-4xl text-center font-bold text-zinc-100 w-[80%] '>Welcome to E-Commerce Shopping</h1>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthLayout