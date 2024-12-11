import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import profileService from '../services/profileService'
import { Container, Post } from '../components';
function Profile() {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([])
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
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await profileService.getPostByUsername(username);
                setPosts(response.data.posts)
            } catch (error) {
                setError(error.message || 'Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };
        if (username) {
            fetchProfile();
            fetchPosts();
        }
    }, [username]);
    if (profile) {

        return (
            <div className="bg-zinc-900 profile flex flex-col gap-6 justify-center items-center h-[88.1vh]">
                {profile && (
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
                    </div>
                )}
                {posts.length == 0 && (
                    <h1 className='font-bold text-white text-2xl'>no posts yet!!!</h1>
                )}
                {posts.length > 0 && (
                    <div className='flex flex-wrap overflow-y-auto justify-center items-center py-2 w-full'>
                        <Container>
                            <div className='flex'>
                                {posts.map((post) => (
                                    <div className='p-2 w-1/4 flex-[0 0 auto]' key={post._id}>
                                        <Post content={post.content} images={post.images} tags={post.tags} />
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </div>
                )}
            </div>
        );
    }
}
export default Profile
