import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import profileService from '../services/profileService'
import { Container, Post } from '../components';
import followService from '../services/followService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
function Profile() {
    const authStatus = useSelector((state) => state.auth.status)
    const { username } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await profileService.getProfileByUsername(username);
                console.log(response)
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
    const followUser = async () => {
        if (!authStatus) {
            alert("You must be logged in to follow the user.");
            return;
        }
        try {
            const userId = profile.account._id
            const response = await followService.followUserService(userId)
        } catch (error) {
            console.error('Error liking post:', error.message);
        }
    }
    const followers = async () => {
        navigate(`/profile/${username}/followers`)
    }
    const followings = async () => {
        navigate(`/profile/${username}/followings`)
    }
    if(loading){
        return(
            <span className='font-bold text-3xl text-white p-4 '>loading.....</span>
        )
    }
    if (profile) {

        return (
            <div className="bg-zinc-900 profile flex flex-col gap-6 justify-center items-center h-[88.1vh]">
                {profile && (
                    <div className='max-md:m-2 flex justify-center flex-col text-white bg-zinc-950 border-2 border-zinc-700 rounded-xl py-3 px-2 my-1 shadow-lg shadow-white/20'>
                        <div className='flex justify-between gap-4 p-4'>
                            <img className='rounded-full inline-block w-1/3 h-full max-md:h-1/2' src={profile.account.avatar.url} alt='' />
                            <div className='flex flex-col justify-center'>
                                <div className='flex justify-between gap-4'>
                                    <span className='inline-block text-xl font-bold underline m-2 max-md:font-medium max-md:text-lg'>{profile.account.username}</span>
                                    <button onClick={followUser} className='border-zinc-200 hover:bg-zinc-200 hover:text-black text-white border-2 rounded-2xl px-2 py-1'>{profile.isFollowing ? 'Following' : 'Follow'}</button>
                                </div>
                                <div>
                                    <span onClick={followers} className='cursor-pointer inline-block text-xl font-bold underline m-2'>Followers: {profile.followersCount}</span>
                                    <span onClick={followings} className='cursor-pointer inline-block text-xl font-bold underline m-2'>Following: {profile.followingCount}</span>
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
                            <div className='flex max-md:w-[100%]'>
                                {posts.map((post) => (
                                    <div className='p-2 w-1/4 max-md:w-[80%] flex-[0 0 auto]' key={post._id}>
                                        <Post content={post.content}
                                            images={post.images}
                                            tags={post.tags} />
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
