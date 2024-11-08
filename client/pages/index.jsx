import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './appContext.jsx';
import { AppContext } from './appContext.jsx';
import { supabase } from '../components/supabaseClient';
import Link from 'next/link';

const Main = () => {
  const { darkMode } = useContext(AppContext);
  const router = useRouter();
  const { user } = useContext(UserContext);

  const handleExploreClick = () => {
    router.push('/receipts');
  };

  const [receipts, setReceipts] = useState([]);

  const fetchReceipts = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('name, description, imageurl, created_at, id')
        .eq('id', Math.floor(Math.random() * 5) + 1);

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setReceipts(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const truncateDescription = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  const styles = {
    position: 'absolute',
    top: user ? '3vh' : '1.5vh',
    '@media (min-width: 768px)': {
      position: 'absolute',
      top: user ? '3vh' : '1.5vh',
    },
    '@media (max-width: 767px)': {
      position: 'static',
      top: 'auto',
    },
  };
  
  return (
    <div style={styles} className={`flex flex-col md:flex-row items-center justify-center min-h-screen py-2 border-x border-gray-200 ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`flex flex-col items-center justify-center text-center  w-full md:w-2/3 p-4 ${darkMode ? 'dark-mode' : ''}`}>
        <h1 className={`text-4xl font-extrabold mb-4 text-gray-800 ${darkMode ? 'dark-mode' : ''}`}>
          Welcome to our recipe site!
        </h1>
        <p className={`text-lg text-gray-600 mb-4 ${darkMode ? 'dark-mode' : ''}`}>
          Ready to explore new flavors? Click the button below to begin your culinary adventure.
        </p>
        <button
          onClick={handleExploreClick}
          className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-3 md:text-lg md:px-10 ${darkMode ? 'dark-mode' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16 " />
          </svg>
          Explore
        </button>
      </div>
      <div className='entreV hidden md:block'></div>
      <div className={`flex flex-col items-center justify-center text-center w-full md:w-1/3 p-4 ${darkMode ? 'dark-mode' : ''}`}>
        <h1 className={`text-4xl font-extrabold mb-4 text-gray-800 ${darkMode ? 'dark-mode' : ''}`}>
          Recipe of the day
        </h1>
        {receipts.map((receipt) => (
          <div className={`m-4 c-receipt__item2 transform transition duration-500 hover:scale-105 ${darkMode ? 'bg-500' : ''}`} key={receipt.id}>
            <div className="c-receipt__img">
              <img
                src={receipt.imageurl}
                alt={`Tarte au chocolat ${receipt.id}`}
                className={`w-full h-72 sm:h-52 object-cover rounded transition duration-500 hover:opacity-90 ${darkMode ? 'dark-mode' : ''}`}
                loading="lazy"
              />
            </div>
            <div className={`c-receipt__content h-72 sm:h-52 p-2 bg-white rounded shadow-md transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${darkMode ? 'dark-mode' : ''}`}>
              <Link href={`/recette/${receipt.id}`}>
                <h3 className={`text-xl font-bold mt-2 mb-4 transition-colors duration-500 hover:text-indigo-600 ${darkMode ? 'dark-mode' : ''}`}>
                  {truncateDescription(receipt.name, 23)}
                </h3>
              </Link>
              <p className={`text-gray-700 text-sm transition-all duration-500 hover:text-gray-600 ${darkMode ? 'dark-mode' : ''}`}>
                {truncateDescription(receipt.description, 100)}
                <Link href={`/recette/${receipt.id}`}>
                  <span className="transition-colors duration-500 hover:text-indigo-600">...Read more !</span>
                </Link>
              </p>
              <div className='flex justify-center items-center'>
                <span className={`block text-sm text-gray-500 ${darkMode ? 'dark-mode' : ''}`} style={{ fontSize: '13px' }}>
                  Posted the {new Date(receipt.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
