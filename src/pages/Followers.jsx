import React from 'react'
import { Follow } from '../components'
import { useParams } from 'react-router-dom'

function Followers() {
    const { username } = useParams();

    console.log(username)
    return (
        <div className='bg-zinc-900 flex items-center justify-center h-[88.1vh]'>
            <Follow/>
        </div>
    )
}

export default Followers
