import React, { useEffect, useState } from 'react'
import profileService from '../services/profileService'
import { Container, Post } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        profileService.getAllPosts().then((response) => {
            if (response && response.data.posts) {
                setPosts(response.data.posts);
            }
        })
    }, [])
    return (
        <div className='min-h-[88.1vh] bg-zinc-950 '>
            <Container>
                <div className='flex flex-wrap flex-col overflow-y-auto items-center py-2'>
                    {
                        posts.map((post) => (
                            <div className='p-2 w-1/4 flex-[0 0 auto]' key={post._id}>
                                <Post content={post.content}
                                    images={post.images}
                                    tags={post.tags} />
                            </div>
                        ))}
                </div>
            </Container>
        </div>
    )
}

export default Home