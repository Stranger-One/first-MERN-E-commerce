import { UserHeader } from '@/components'
import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {

  
  return (
    <div className='flex flex-col w-full'>
        {/* common header */}
        <UserHeader />
        <main className='flex flex-col w-full'>
            <Outlet />
        </main>
    </div>
  )
}

export default UserLayout