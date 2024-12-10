import React from 'react'

function post({ content, images, tags }) {
    return (
        <div className='bg-zinc-900 text-white border-zinc-700 border-2 rounded-lg p-2 flex justify-center items-start flex-col'>
            {images && images.length > 0 && (
                <img className=' h-60 border-2 border-zinc-800 rounded-lg p-2 mx-auto hover:shadow-md hover:shadow-zinc-700/40' src={images[0].url} alt="Post" /> // Ensure you access the correct image URL
            )}
            <p className='py-1 my-1'>{content}</p>
            {tags && tags.length > 0 && (
                <div className="py-1 my-1 text-zinc-500">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span> // Render tags if needed
                    ))}
                </div>
            )}
        </div>
    );
}

export default post
