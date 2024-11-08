import React, { useContext } from 'react';
import { BsPhone } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { AppContext } from './appContext.jsx';

const PageContacts = () => {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen mx-auto p-4 ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className={`text-4xl font-bold mb-8 text-center ${darkMode ? 'dark-mode' : ''}`}>Contact us</h1>
      <div className={`flex flex-col w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-8 ${darkMode ? 'dark-mode' : ''}`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'dark-mode' : ''}`}>Our contact details</h2>
        <ul className="list-none">
          <li className={`flex items-center mb-4 ${darkMode ? 'dark-mode' : ''}`}>
            <BsPhone className={`text-xl text-blue-500 mr-4 ${darkMode ? 'dark-mode' : ''}`} />
            <p className={`text-lg mb-0 ${darkMode ? 'dark-mode' : ''}`}>Phone number: +33 753 651 249</p>
          </li>
          <li className={`flex items-center ${darkMode ? 'dark-mode' : ''}`}>
            <MdEmail className={`text-xl text-blue-500 mr-4 ${darkMode ? 'dark-mode' : ''}`} />
            <p className={`text-lg mb-0 ${darkMode ? 'dark-mode' : ''}`}>Email: agharmioumassine@gmail.com</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PageContacts;
