import React from 'react'
import { Button } from '../ui/button'
import { LuLogOut } from "react-icons/lu";
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setIsAuthenticated, setUserData } from '@/store/authSlice';

const AdminHeader = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()


  
  const logout = async () => {

    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {}, {
      withCredentials: true
    }).then((response) => {
      if (response) {
        dispatch(setIsAuthenticated(false))
        dispatch(setUserData(null))

        toast({
          title: response.data.message,
        })
      }
    }).catch((error) => {
      console.log("something went wrong ...",error)
    })
  };


  return (
    <header className='flex justify-between items-center py-2 border-b-[1px] px-4'>

      <button></button>
      <div className="">
        <Button  onClick={logout} className="flex gap-2 px-4 py-2 items-center text-[16px] ">
          <LuLogOut className='font-bold text-xl' />
          Logout
        </Button>
      </div>

    </header>
  )
}

export default AdminHeader