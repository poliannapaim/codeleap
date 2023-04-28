import { useEffect, useState } from 'react';
import EditPosts from './editPosts';
import DeletePost from './deletePost';

export default function FetchPosts() {
    const [username, setUsername] = useState(null);
    const [posts, setPosts] = useState(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('username')) {
            setUsername(localStorage.getItem('username'));
        } else {
            setUsername(null);
        }

        const reqPosts = async () => {
            try {
                const res = await fetch(`https://dev.codeleap.co.uk/careers/`, {
                    headers: {
                        Accept: 'application/json',
                    }
                });
                const json = await res.json();
                if (!res.ok) {
                    return alert('Oops! Something went wrong while fetching the data.');
                }
                setPosts(json.results);
            } catch (error) {
                console.error(`Error: Unable to fetch data: ${error}`);
            }
        }
        reqPosts();
    }, []);

    if (!posts) {
        return <></>
    }
    
    const listPosts = posts.length ? posts.map(p => 
        <div className='w-full' key={ p.id }>
            <div className='flex flex-row justify-between rounded-t-md bg-sky-700 text-stone-200 p-5'>
                <h3 className='font-bold text-base'>
                    { p.title }
                </h3>
                {p.username === username ?
                    <div className='flex flex-row gap-4 text-lg'>
                        <EditPosts data={{ 'id': p.id, 'title': p.title, 'content': p.content }}/>
                        <DeletePost data={{ 'id': p.id }}/>
                    </div>
                : null}
            </div>
            <div className='p-5 border border-stone-500 rounded-b-md space-y-4'>
                <p className='text-stone-500 font-bold'>@{ p.username }</p>
                <p className='text-stone-800 truncate'>{ p.content }</p>
            </div>
        </div>
    ) : null

    return (
        <>{ listPosts }</>
    )
}
