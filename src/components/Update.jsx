import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import profileService from '../services/profileService'


function Update() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUpdate = async (data) => {
        setError('');
        setLoading(true);
        try {
            console.log(data)
            const userProfile = await profileService.updateService(data); // Send FormData
            console.log(userProfile);
            if (userProfile) {
                navigate('/profile');
            }
        } catch (error) {
            console.error("Update error:", error.message); // Log the error message
            setError(error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    return (
        <div className='bg-zinc-950 text-white p-4 w-full h-[87.5vh] flex justify-center items-center'>
            <form onSubmit={handleSubmit(handleUpdate)} className='border-2 border-zinc-700 rounded-lg py-3 px-2 shadow-lg shadow-white/20' action="">
                <h1 className='py-3 px-2 font-bold text-xl text-center'>Update Your Profile !!!</h1>
                <div className='flex items-center py-3 px-2 gap-3'>
                    <div className='flex flex-col items-center py-3 px-2 gap-3'>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="bio">Bio:</label>
                            <input
                                {...register("bio", {
                                    required: true
                                })}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' id="bio" name="bio" placeholder="bio" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="firstName">FirstName:</label>
                            <input
                                {...register("firstName", {
                                    required: true
                                })}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' id="firstName" name="firstName" placeholder="firstName" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="lastName">LastName:</label>
                            <input
                                {...register("lastName", {
                                    required: true
                                })}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' id="lastName" name="lastName" placeholder="lastName" />
                        </div>
                    </div>
                    <div className='flex flex-col items-center py-3 px-2 gap-3'>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="location">Location:</label>
                            <input
                                {...register("location", {
                                    required: true
                                })}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' id="location" name="location" placeholder="location" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="countryCode">CountryCode:</label>
                            <input
                                {...register("countryCode", {
                                    required: true
                                })}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' id="countryCode" name="countryCode" placeholder="countryCode" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='px-1' htmlFor="phoneNumber">PhoneNumber:</label>
                            <input
                                {...register("phoneNumber", {
                                    required: true
                                })}
                                className='bg-transparent border-2 border-zinc-700 rounded-lg px-2 py-1' id="phoneNumber" name="phoneNumber" placeholder="phoneNumber" />
                        </div>
                    </div>
                </div>
                <button type='submit' className='border-zinc-200 hover:bg-zinc-200 hover:text-black border-2 rounded-2xl px-2 py-1 font-semibold w-1/3'>Update</button>
            </form>
        </div>
    )
}

export default Update
