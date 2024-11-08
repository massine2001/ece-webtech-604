import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../pages/appContext';

const Header = () => {
  const { logout } = useContext(UserContext);
  const { user } = useContext(UserContext);

  return (
    <nav className={user ? 'c-header' : ''}>
      {user && (
        <>
          <div className={user ? 'c-little-header' : 'c-little-header-dec'}>
            <Link href="/addRecipe"><button className='header-btn'>Add a recipe</button></Link>
            <Link href="/receipts"><button className='header-btn'>Explore the recipes</button></Link>
            <Link href="/myRecipe"><button className='header-btn'>My recipes</button></Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
