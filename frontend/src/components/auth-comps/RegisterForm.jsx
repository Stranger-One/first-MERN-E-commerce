import React, { useState } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"
import { registerUser } from '@/services/authServices';


const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { toast } = useToast()
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        const register = await registerUser(username, email, password)
        if(register){
            toast({
                title: 'User created successfully'
            })
            navigate('/auth/login')

            setUsername('')
            setEmail('')
            setPassword('')
        } else {
            toast({
                title: 'User creation failed!'
            })
        }

        // await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        //     userName: username,
        //     email,
        //     password
        // }, {
        //     withCredentials: true
        // }).then((response) => {
        //     toast({
        //         title: response.data.message
        //     })
        //     navigate('/auth/login')

        //     setUsername('')
        //     setEmail('')
        //     setPassword('')
        // }).catch((err) => {
        //     console.log(err);
        //     toast({
        //         title: err.response.data.message,
        //         variant: "destructive"
        //     })
        // })

    };


    return (
        <form onSubmit={handleRegister} className='w-[350px] border-[1px] border-slate-800 p-4 rounded-md '>
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto ">
                <img src="/user-placeholder.jpeg" alt="" className='w-full h-full scale-110' />
            </div>
            <div className="mb-10 text-center">
                <h2 className='text-2xl font-semibold capitalize'>create your account</h2>
                <p className='text-sm'>Already have an account? <Link to="/auth/login" className='text-blue-800 font-semibold'>Login</Link></p>

            </div>
            <div className="flex flex-col gap-2 ">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="username">User Name</Label>
                    <Input required type="username" id="username" placeholder="Enter Your Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input required type="email" id="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input required type="password" id="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <Button type="submit" className="w-full mt-4">Create Account</Button>
        </form>
    )
}

export default RegisterForm