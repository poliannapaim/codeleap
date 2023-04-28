import Login from '../components/Login';
import Logout from '../components/Logout';
import FetchPosts from '../actions/fetchPosts';
import NewPost from '../actions/newPost';
import { useState, useEffect } from 'react';

export default function Home() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    if (localStorage.getItem('username')) {
      setUsername(localStorage.getItem('username'));
    } else {
      setUsername(null);
    }
  });
  
  return (
    <main className={`flex min-h-screen flex-col`}>
      <div className='bg-sky-700 p-6 w-full flex flex-row justify-between items-center'>
          <h1 className=' text-stone-200 font-bold text-2xl'>CodeLeap Network</h1>
          { username ? <Logout/> : <Login/> }
      </div>
      <div className='bg-stone-100 p-6 w-full flex flex-col gap-4'>
        { username ? <NewPost/> : null }
        <FetchPosts/>
      </div>
    </main>
  )
}
