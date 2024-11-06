import { AdminHeader, AdminSidebar } from '@/components'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='w-full h-screen flex'>
      {/* admin sidebar */}
      <AdminSidebar />
      <div className="w-full flex flex-col ">
        {/* admin header */}
        <AdminHeader />
        <main className='h-full w-full flex bg-muted/40 p-2 lg:p-4 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout