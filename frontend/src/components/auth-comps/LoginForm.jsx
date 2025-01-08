import React, { useState } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setIsLoading, setUserData } from '@/store/authSlice';
import { useToast } from '@/hooks/use-toast';
import { createCart } from '@/services/cartServices';
import { loginUser } from '@/services/authServices';
import { BtnLoader } from '..';

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.auth.isLoading)
    const [loading, setLoading] = useState(false)

    const { toast } = useToast()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        const response = await loginUser(email, password)
        if (response.success) {
            localStorage.setItem('token', JSON.stringify(response.token))

            dispatch(setIsAuthenticated(true))
            dispatch(setUserData(response.data))

            createCart(response.data.id)

            toast({
                title: "login successfully",
            })
        } else {
            toast({
                title: 'login failed!',
                variant: "destructive"
            })
        }

        dispatch(setIsLoading(false))
        setLoading(false)

    };


    return (
        <form onSubmit={handleLogin} className='w-[350px] border-[1px] border-slate-800 p-4 rounded-md '>
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto ">
                <img src="/user-placeholder.jpeg" alt="" className='w-full h-full scale-110' />
            </div>
            <div className="mb-10 text-center">
                <h2 className='text-2xl font-semibold capitalize'>Login to your Account</h2>
                <p className='text-sm'>Don't have an account? <Link to="/auth/register" className='text-blue-800 font-semibold'>Register here</Link></p>

            </div>
            <div className="flex flex-col gap-2 ">

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input required type="email" id="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input required type="password" id="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <Button type="submit" className="w-full mt-4">{loading ? <BtnLoader/> : "Login"}</Button>
        </form>
    )
}

export default LoginForm