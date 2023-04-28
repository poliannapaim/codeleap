import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NewPost() {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [username, setUsername] = useState(null);
    const router = useRouter();

    useEffect(() => {
      if (localStorage.getItem('username')) {
        setUsername(localStorage.getItem('username'));
      } else {
        setUsername(null);
      }
    });

    const handleNewPost = (e) => {
        e.preventDefault();
        const url = `https://dev.codeleap.co.uk/careers/`
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                title,
                content
            })
        }
        const createPost = async () => {
            try {
                const res = await fetch(url, options)
                if (!res.ok) {
                    return alert(`Oops! Something went wrong while posting: ${res}`)
                }
                alert('The post was created.')
                router.reload();
            }
            catch (error) {
                console.error(`An error occurred while posting: ${error}`)
            }
        }
        createPost()
    }

    return (
        <form className='border border-stone-500 rounded-md p-5'
        onSubmit={handleNewPost}>
            <h2 className='text-sky-700 font-bold text-lg'>
                Hello @{username}! What's on your mind?
            </h2>
            <div>
                <h3 className='text-stone-800 font-bold text-base mt-4'>
                    Title
                </h3>
                <input className='title w-full p-3 bg-stone-100 border border-stone-500 rounded-md text-stone-800 focus:outline focus:outline-2 focus:outline-sky-600 focus:border-sky-600'
                type='text' placeholder='Hello word' name='title' value={title || ''} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <h3 className='text-stone-800 font-bold text-base mt-4'>
                    Content
                </h3>
                <textarea
                    className='content w-full p-3 bg-stone-100 border border-stone-500 rounded-md text-stone-800 focus:outline focus:outline-2 focus:outline-sky-600 focus:border-sky-600'
                    type='content' placeholder='Content here' name='content' value={content || ''} onChange={(e) => setContent(e.target.value)}/>
            </div>
            <div className='flex justify-end'>
                <button className='bg-sky-600 text-stone-200 hover:bg-sky-500 font-bold uppercase text-sm lg:px-10 px-6 py-3 rounded-md hover:drop-shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 disabled:bg-slate-400 disabled:drop-shadow-none disabled:cursor-not-allowed'
                type='submit' disabled={!title || !content}>
                    create
                </button>
            </div>
        </form>
    )
}
