import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './appContext';
import Gravatar from 'react-gravatar';
import { AppContext } from './appContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

function UpdateProfilePage() {
  const { user, setUser, updateUser } = useContext(UserContext);
  const [success, setSuccess] = useState(null);
  const { darkMode } = useContext(AppContext);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateResult = await updateUser(user);
    setSuccess(updateResult);
    if (updateResult) {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <ProtectedRoute>
      <div className={`min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12  ${darkMode ? 'dark-mode' : ''}`}>
        <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orangered-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rounded-3xl sm:-rotate-6  hover:rotate-[-6deg] hover:translate-x-[-6px] transition-transform duration-500"></div>
          <div className={`relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl hover:scale-105 transition-transform duration-1000 sm:p-20 ${darkMode ? 'rkmode' : ''}`}>
            <div className="max-w-md mx-auto">
              <div>
                {user && user.id && <Gravatar className="h-20 w-20 rounded-full mx-auto" email={user.id} />}
              </div>
              <div className="text-center">
                <h1 className={`text-2xl font-semibold text-gray-900 ${darkMode ? 'text-gray-300' : ''}`}>Modify the profil</h1>
              </div>
              {success === false && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                  <p className="font-bold">Error</p>
                  <p>Profile update failed.</p>
                </div>
              )}
              {success && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4" role="alert">
                  <p className="font-bold">Success</p>
                  <p>The profile has been successfully updated.</p>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                      <div className="flex flex-col">
                        <label className={`leading-loose ${darkMode ? 'text-gray-300' : ''}`}>Email</label>
                        <input type="email" name="email" value={user ? user.email : ''} readOnly className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" />
                      </div>
                      <div className="flex flex-col">
                        <label className={`leading-loose ${darkMode ? 'text-gray-300' : ''}`}>Username</label>
                        <input type="text" name="username" value={user && user.username !== null && user.username !== undefined ? user.username : ''} onChange={handleChange} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" />
                      </div>
                      <div className="flex flex-col">
                        <label className={`leading-loose ${darkMode ? 'text-gray-300' : ''}`}>Phone</label>
                        <input type="tel" name="phone" value={user && user.phone !== null && user.phone !== undefined ? user.phone : ''} onChange={handleChange} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder='Exemple : +33 xxxxxxxxx' pattern="[+]{1}[0-9]{11,14}" />
                      </div>
                      <div className="flex flex-col">
                        <label className={`leading-loose ${darkMode ? 'text-gray-300' : ''}`}>Full Name</label>
                        <input type="text" name="full_name" value={user && user.full_name !== null && user.full_name !== undefined ? user.full_name : ''} onChange={handleChange} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className={`leading-loose ${darkMode ? 'text-gray-300' : ''}`}>Bio</label>
                      <textarea name="bio" value={user && user.bio !== null && user.bio !== undefined ? user.bio : ''} onChange={handleChange} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" />
                    </div>
                  </div>
                  <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                    <p>
                      <button type="submit" className="py-2 px-4 bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Update Profile
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default UpdateProfilePage;
