import React, { useEffect, useState } from 'react'
import profileService from '../services/profileService'
import { useNavigate } from 'react-router-dom';

function Profile() {

    const [profile, setProfile] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await profileService.getProfileService(); // Log the response for debugging

                // Check if the response contains the expected profile data
                if (response.success && response.data) {
                    setProfile(response.data);// Adjust based on actual response structure
                } else {
                    setError('No profile data available.');
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);
    if (!profile) {
        return <div className="text-white">No profile data available.</div>;
    }

    const updateProfile = async()=>{
        navigate('/update-profile')
    }
    return (
        <div className="bg-zinc-900 profile flex flex-col gap-6 justify-center items-center h-[88.1vh]">
            <div className='flex justify-center flex-col text-white bg-zinc-950 border-2 border-zinc-700 rounded-xl py-3 px-2 shadow-lg shadow-white/20'>
                <h1 className='text-center font-bold text-xl text-white'>Your Profile!!!</h1>
                <div className='flex justify-between gap-4 p-4'>
                    <img className='rounded-3xl inline-block' src={profile.account.avatar.url} alt='' />
                    <span className='inline-block text-xl font-bold underline m-2'>Followers: {profile.followersCount}</span>
                    <span className='inline-block text-xl font-bold underline m-2'>Following: {profile.followingCount}</span>
                </div>
                <div className='flex flex-col items-start mx-4'>
                    <span className='inline-block text-xl font-bold underline m-2'>{profile.account.username}</span>
                    <span className='inline-block text-xl font-bold underline m-2'>{profile.account.email}</span>
                    <span className='inline-block text-xl font-bold underline m-2'>{profile.bio}</span>
                </div>
            </div>
            <button onClick={updateProfile} className='border-zinc-200 hover:bg-zinc-200 hover:text-black text-white border-2 rounded-2xl px-2 py-1'>update</button>
        </div>
    )
}

export default Profile
