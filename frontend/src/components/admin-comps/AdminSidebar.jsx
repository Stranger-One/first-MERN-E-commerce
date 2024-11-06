import React from 'react'
import { MdOutlineAnalytics } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { RiDashboardLine } from "react-icons/ri";
import { LuShoppingBasket } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";


const AdminSidebar = () => {
  const navigate = useNavigate()

  const navItems = [
    {
      title: 'Dashboard',
      path: "/admin/dashboard",
      icon: <RiDashboardLine className='text-2xl' />
    },
    {
      title: 'Products',
      path: "/admin/products",
      icon: <LuShoppingBasket className='text-2xl' />
    },
    {
      title: 'Orders',
      path: "/admin/orders",
      icon: <LuShoppingCart className='text-2xl' />
    },
  ]


  return (
    <aside className='w-64 h-screen bg-slate-200 p-2 flex flex-col '>
      <div onClick={() => navigate("/admin/dashboard")} className="w-full flex items-center gap-2 cursor-pointer bg-slate-300 p-2 rounded-lg ">
        <MdOutlineAnalytics className='text-2xl' />
        <h1 className='text-xl font-extrabold'>Admin Panel</h1>
      </div>
      <hr className=' border-black my-1' />
      <div >
        <ul className="flex flex-col gap-1 w-full">{navItems.map((item) => (
          <li key={item.title} onClick={() => navigate(item.path)} className="w-full flex
          items-center gap-2 cursor-pointer hover:bg-slate-300 p-2 rounded-lg font-semibold">
            <React.Fragment>
              {item.icon}
            </React.Fragment>
            {item.title}
          </li>
        ))
        }</ul>
      </div>

    </aside>
  )
}

export default AdminSidebar