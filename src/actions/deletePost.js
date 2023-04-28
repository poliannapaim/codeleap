import { FaRegTrashAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DeletePost(props) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    
    const handleDelete = (e) => {
        e.preventDefault();
        const url = `https://dev.codeleap.co.uk/careers/${props.data.id}/`
        const options = {
            method: 'DELETE'
        }
        const deletePost = async () => {
            try {
                const res = await fetch(url, options)
                if (!res.ok) {
                    return alert(`Oops! Something went wrong while deleting: ${res}`)
                }
                alert('The post was deleted.')
                router.reload();
            }
            catch (error) {
                console.error(`An error occurred while deleting: ${error}`)
            }
        }
        deletePost()
    }

    return (
        <>
            <button type='button' onClick={() => setShowModal(true)}><FaRegTrashAlt/></button>

            {showModal ? 
                <>
                <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                    <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                        <div className='modal p-8 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-stone-100 outline-none focus:outline-none'>
                            <div className='flex items-start justify-between'>
                                <h3 className='text-stone-800 text-2xl font-semibold'>
                                    Are you sure you want to delete this post?
                                </h3>
                            </div>
                            <form onSubmit={handleDelete}>
                            <div className='mt-10 flex gap-2 justify-end'>
                                <button className='bg-stone-100 text-stone-800 font-bold uppercase text-sm lg:px-10 px-6 py-3 rounded-md border border-stone-500 hover:drop-shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
                                type='button' onClick={() => setShowModal(false)}>
                                    cancel
                                </button>
                                <button className='bg-red-600 hover:bg-red-700 font-bold uppercase text-sm lg:px-10 px-6 py-3 rounded-md hover:drop-shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
                                type='submit'>
                                    delete
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
