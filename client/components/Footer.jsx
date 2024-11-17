import React, { useContext } from 'react';
import { UserContext } from '../pages/appContext';

function Footer() {
  const { user } = useContext(UserContext);
//{user && user.email && (user.username ? user.username : user.email.split('@')[0])}
  return (
    <footer className="c-footer">
      <div className="flex justify-between">
        <p className="text-gray-100 text-sm">© 2023 - 2024</p>
        <p className="text-gray-100 text-sm">Personal Project  /  Recipes for mother</p>
        {user && (
          <div className="text-green-500 text-sm">
            connecté
          </div>
        )}
        {!user && <div className="text-gray-500 text-sm">Guest user</div>}
      </div>
    </footer>
  );
}

export default Footer;
