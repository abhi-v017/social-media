import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import authService from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const signupHandler = async (data) => {
        setError('')
        setLoading(true);
        
        try {
            const userData = await authService.signUpService(data.username, data.email, data.password)
            console.log(userData)
            navigate('/')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false); // Reset loading state
        }
    }
    return (
        <div className='bg-zinc-950 text-white p-4 w-full h-[88.1vh] flex justify-center items-center'>
            <form onSubmit={handleSubmit(signupHandler)} className='border-2 border-zinc-700 rounded-lg py-3 px-2 shadow-lg shadow-white/20' action="">
                <h1 className='py-3 px-2 font-bold text-xl text-center'>create your account bro !!!</h1>
                <div className='flex flex-col items-center py-3 px-2 gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="email">E-mail:</label>
                        <input
                        {...register("email", {
                            required: true
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="text" id="email" name="email" placeholder="abc@gmail.com" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="username">Username:</label>
                        <input
                        {...register("username", {
                            required: true
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="text" id="username" name="username" placeholder="username" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='px-1' htmlFor="password">Password:</label>
                        <input
                        {...register("password", {
                            required: true
                        })}
                        className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' type="password" id="password" name="password" placeholder="password" />
                    </div>
                    
                    <button type='submit' className='border-zinc-200 hover:bg-zinc-200 hover:text-black border-2 rounded-2xl px-2 py-1 font-semibold w-1/3'>Signup</button>
                </div>
                <p className="mt-2 text-center text-base text-zinc-700">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline hover:text-white"
                    >
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Signup
