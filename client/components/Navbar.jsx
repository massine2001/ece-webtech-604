import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../pages/appContext';
import DarkModeToggle from './DarkModeToggle';
import SocialShare from './SocialShare';
import { AppContext } from '../pages/appContext';
import Gravatar from 'react-gravatar';

function Navbar() {
  const { logout } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const { darkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <nav className='c-nav'>
      <div className='flex justify-center items-center'>
        {user && user.id && <Gravatar className="h-5 w-5 ml-3 rounded-full mx-auto ml-5" email={user.id} />}
        {user && <Link href="/profile_user"><button className='navbar-btn-profil'>My profil</button></Link>}
        {!user && <span className='font-semibold ml-3'>Welcome !</span>}
      </div>
      <div className='c-little-nav'>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>|</span>
        <Link href="/about" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>About </Link>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>|</span>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>Home </Link>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>|</span>
        <Link href="/contacts" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>Contacts </Link>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>|</span>
        <SocialShare />
      </div>
      {!user && <Link href="/loggingPage"><button className='navbar-btn-co'>Sign in</button></Link>}
      {user && <button onClick={logout} className='navbar-btn-dec'>Log out</button>}
    </nav>
  );
}

export default Navbar;
