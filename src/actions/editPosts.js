import { FaRegEdit } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EditPosts(props) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(props.data.title);
    const [content, setContent] = useState(props.data.content);
    const router = useRouter();
    
    const handleEdit = (e) => {
        e.preventDefault();
        const url = `https://dev.codeleap.co.uk/careers/${props.data.id}/`
        const options = {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content
            })
        }
        const editPost = async () => {
            try {
                const res = await fetch(url, options)
                if (!res.ok) {
                    return alert(`Oops! Something went wrong while editing: ${res}`)
                }
                alert('The post was edited.')
                router.reload();
            }
            catch (error) {
                console.error(`An error occurred while editing: ${error}`)
            }
        }
        editPost()
    }

    return (
        <>
            <button type='button' onClick={() => setShowModal(true)}><FaRegEdit/></button>

            {showModal ? 
                <>
                <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                    <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                        <div className='modal p-8 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-stone-100 outline-none focus:outline-none'>
                            <div className='flex items-start justify-between'>
                                <h3 className='text-stone-800 text-2xl font-semibold'>
                                    Edit item
                                </h3>
                            </div>
                            <form onSubmit={handleEdit}>
                            <div>
                                <h3 className='text-stone-800 font-bold text-base mt-4'>
                                    Title
                                </h3>
                                <input className='title w-full p-3 bg-stone-100 border border-stone-500 rounded-md text-stone-800 focus:outline focus:outline-2 focus:outline-sky-600 focus:border-sky-600'
                                type='text' placeholder={title} name='title' value={title || ''} onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                            <div>
                                <h3 className='text-stone-800 font-bold text-base mt-4'>
                                    Content
                                </h3>
                                <textarea
                                    className='content w-full p-3 bg-stone-100 border border-stone-500 rounded-md text-stone-800 focus:outline focus:outline-2 focus:outline-sky-600 focus:border-sky-600'
                                    type='content' placeholder={content} name='content' value={content || ''} onChange={(e) => setContent(e.target.value)}/>
                            </div>
                            <div className='mt-2 flex gap-2 justify-end'>
                                <button className='bg-stone-100 text-stone-800 font-bold uppercase text-sm lg:px-10 px-6 py-3 rounded-md border border-stone-500 hover:drop-shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
                                type='button' onClick={() => setShowModal(false)}>
                                    cancel
                                </button>
                                <button className='bg-teal-600 hover:bg-teal-500 font-bold uppercase text-sm lg:px-10 px-6 py-3 rounded-md hover:drop-shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 disabled:bg-slate-400 disabled:drop-shadow-none disabled:cursor-not-allowed'
                                type='submit' disabled={!title || !content}>
                                    save
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='opacity-60 fixed inset-0 z-40 bg-stone-800'></div>
                </>
            : null}
        </>
    )
}
