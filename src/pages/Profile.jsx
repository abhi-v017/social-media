import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import profileService from '../services/profileService'
function Profile() {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await profileService.getProfileByUsername(username);
                setProfile(response.data)
            } catch (error) {
                setError(error.message || 'Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };
        if (username) {
            fetchProfile();
        }
    }, [username]);
    if(profile){

        return (
            <div className="bg-zinc-900 profile flex flex-col gap-6 justify-center items-center h-[88.1vh]">
                <div className='flex justify-center flex-col text-white bg-zinc-950 border-2 border-zinc-700 rounded-xl py-3 px-2 my-1 shadow-lg shadow-white/20'>
                    <div className='flex justify-between gap-4 p-4'>
                        <img className='rounded-full inline-block w-1/3 h-full' src={profile.account.avatar.url} alt='' />
                        <div className='flex flex-col justify-center'>
                            <div className='flex justify-between gap-4'>
                                <span className='inline-block text-xl font-bold underline m-2'>{profile.account.username}</span>
                                <button className='border-zinc-200 hover:bg-zinc-200 hover:text-black text-white border-2 rounded-2xl px-2 py-1'>Follow</button>
                            </div>
                            <div>
                                <span className='inline-block text-xl font-bold underline m-2'>Followers: {profile.followersCount}</span>
                                <span className='inline-block text-xl font-bold underline m-2'>Following: {profile.followingCount}</span>
                            </div>
                            <span className='inline-block text-xl font-bold underline m-2'>{profile.bio}</span>
                        </div>
                    </div>
                    <div className='flex flex-col items-start mx-4 w-1/2'>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile
