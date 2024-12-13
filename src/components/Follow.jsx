import React from 'react'

function Follow({avatar, username}) {

    return (
        <div className='flex items-center gap-4 w-1/3 border-2 border-zinc-600 bg-zinc-950 text-white'>
            <img className='w-10 h-10 rounded-full border-2 border-zinc-600 m-2' src={avatar} alt="" />
            <span>{username}</span>
        </div>
    )
}

export default Follow
