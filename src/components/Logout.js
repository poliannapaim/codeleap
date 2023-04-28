import { useRouter } from 'next/router';

export default function Logout() {
    const router = useRouter();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('username');
        router.reload();
    }

    return (
        <>
        <form onSubmit={handleLogout}>
            <button className='bg-red-600 text-stone-200 hover:bg-red-700 font-bold uppercase text-sm lg:px-10 px-6 py-3 rounded-md hover:drop-shadow-lg outline-none focus:outline-none ease-linear transition-all duration-200'
            type='submit'>
                logout
            </button>
        </form>
        </>
    )
}
