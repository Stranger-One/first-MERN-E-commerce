import React, { useState } from 'react'
import { IoCartOutline, IoHomeOutline } from 'react-icons/io5'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiUser } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from 'react-redux';
import { MdLogout } from 'react-icons/md';
import { useToast } from '@/hooks/use-toast';
import { setIsAuthenticated, setUserData } from '@/store/authSlice';
import { Sheet } from '../ui/sheet';
import { CartWrapper } from '..';
import { setCartProduct } from '@/store/userGlobalSlice';
import { getCart } from '@/services/cartServices';
import { logoutUser } from '@/services/authServices';


const UserHeader = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)
  const [openCartSheet, setOpenCartSheet] = useState(false)
  const [loadingProducts, SetloadingProducts] = useState(false)


  const handleLogout = async () => {
    const response = await logoutUser()

    if (response) {
      localStorage.removeItem('token')
      dispatch(setIsAuthenticated(false))
      dispatch(setUserData(null))
      toast({
        title: 'logout successfully.',
      })
    }
  };

  const handleCart = async () => {
    setOpenCartSheet(true)
    SetloadingProducts(true)

    const repsonse = await getCart(userData.id)
    // console.log(repsonse);
    dispatch(setCartProduct(repsonse.products))

    SetloadingProducts(false)

  };

  return (
    <header className='sticky top-0 bg-slate-300 w-full h-12 z-40 shadow-md border-b-[1px] border-black '>
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <Link to='/user/home' className='flex items-center gap-1 cursor-pointer group'>
          <IoHomeOutline className='text-xl group-hover:animate-bounce' />
          <span className='font-semibold'>Ecommerce</span>
        </Link>
        <div className="flex h-full items-center gap-2 ">
          {[
            { lable: "home", path: "/user/home" },
            { lable: "products", path: "/user/listing" },
            { lable: "men", path: "/user/listing/men?category=men" },
            { lable: "women", path: "/user/listing/women?category=women" },
            { lable: "children", path: "/user/listing/children?category=children" },
            { lable: "footwear", path: "/user/listing/footwear?category=footwear" },
            { lable: "accesories", path: "/user/listing/accesories?category=accesories" },
          ].map((item, index) => (
            <NavLink key={index} to={item.path} className={({ isActive }) => `${isActive ? "bg-slate-400" : ""} font-semibold capitalize px-2 rounded-lg py-1`} >{item.lable}</NavLink>
          ))}
        </div>
        <div className=" h-full flex items-center gap-4">
          <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <button onClick={handleCart} className='p-1 bg-slate-400 rounded-lg'>
              <IoCartOutline className="text-2xl" />
            </button>
            <CartWrapper
              loadingProducts={loadingProducts}
              setOpenCartSheet={setOpenCartSheet}
            />
          </Sheet>

          {/* <button className='p-1 bg-slate-400 rounded-lg'>
            <FiUser className="text-2xl" />
          </button> */}
          <DropdownMenu>
            <DropdownMenuTrigger className=' outline-none border-none'>
              <button className='p-1 bg-slate-400 rounded-lg outline-none border-none'>
                <FiUser className="text-2xl" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Logged is as {userData.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/user/account")} className="flex items-center gap-2 font-semibold">
                <FiUser className="text-xl" /> <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 font-semibold">
                <MdLogout className="text-xl" /> <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

    </header>
  )
}

export default UserHeader