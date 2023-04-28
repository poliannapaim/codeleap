import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState(null);
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.removeItem('username');
        localStorage.setItem('username', username);
        router.reload();
    }

    return (
        <>
        <button className='bg-stone-200 text-sky-700 hover:bg-stone-100 font-bold uppercase text-sm px-10 py-3 rounded-md hover:drop-shadow-lg outline-none focus:outline-none ease-linear transition-all duration-200'
        onClick={() => setShowModal(true)}>
            login
        </button>
        {showModal ? (
            <>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                    <div className='modal p-8 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-stone-200 outline-none focus:outline-none'>
                        <div className='flex items-start justify-between'>
                            <h3 className='text-stone-800 text-2xl font-semibold'>
                                Welcome to CodeLeap Work!
                            </h3>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className='relative py-8 flex-auto'>
                                <p className='text-stone-800 text-lg leading-relaxed mb-2'>
                                    Please enter your username
                                </p>
                                <input className='username w-full p-3 bg-stone-200 border border-stone-500 rounded-md text-stone-800 focus:outline focus:outline-2 focus:outline-sky-600 focus:border-sky-600'
                                type='text' placeholder='Username' name='username' value={username || ''} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className='flex gap-2 justify-end'>
                                <button className='bg-stone-100 text-stone-800 font-bold uppercase text-sm lg:px-10 px-6 py-3 rounded-md border border-stone-500 hover:drop-shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
                                type='button' onClick={() => setShowModal(false)}>
                                    cancel
                                </button>
                                <button className='bg-sky-600 text-stone-200 hover:bg-sky-500 font-bold uppercase text-sm lg:px-10 px-6 py-3 rounded-md hover:drop-shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 disabled:bg-slate-400 disabled:drop-shadow-none disabled:cursor-not-allowed'
                                type='submit' disabled={!username}>
                                    enter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='opacity-60 fixed inset-0 z-40 bg-stone-800'></div>
            </>
        ) : null}
        </>
    )
}
