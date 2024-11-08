import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { supabase } from '../components/supabaseClient';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import { FaThumbsUp, FaThumbsDown, FaComment } from 'react-icons/fa';
import { AppContext } from './appContext.jsx';

const PageReceipts = ({ initialReceipts }) => {
  const [receipts, setReceipts] = useState(initialReceipts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode } = useContext(AppContext);

  useEffect(() => {
    fetchReceipts().then(() => setIsLoading(false));
  }, []);

  const fetchReceipts = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        const receipts = await Promise.all(data.map(async (receipt) => {
          const [likesCount, dislikesCount, commentsCount] = await Promise.all([
            getLikesCount(receipt.id),
            getDislikesCount(receipt.id),
            getCommentsCount(receipt.id),
          ]);
          return { ...receipt, likesCount, dislikesCount, commentsCount };
        }));
        setReceipts(receipts);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      fetchReceipts();
    } else {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .ilike('name', `%${searchTerm}%`);

        if (error) {
          console.error('Error fetching data from Supabase:', error);
        } else {
          const receipts = await Promise.all(data.map(async (receipt) => {
            const [likesCount, dislikesCount, commentsCount] = await Promise.all([
              getLikesCount(receipt.id),
              getDislikesCount(receipt.id),
              getCommentsCount(receipt.id),
            ]);
            return { ...receipt, likesCount, dislikesCount, commentsCount };
          }));
          setReceipts(receipts);
        }
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
      }
    }
  };

  const getLikesCount = async (recipeId) => {
    const { data, error, count } = await supabase
      .from('votes')
      .select('*', { count: 'exact' })
      .eq('recipe_id', recipeId)
      .eq('likee', true);

    if (error) {
      console.error('Error fetching likes count:', error);
      return 0;
    }

    return count;
  };

  const getCommentsCount = async (recipeId) => {
    const { data, error } = await supabase
      .from('comments')
      .select('id')
      .eq('id_recipe', recipeId);

    if (error) {
      console.error('Error fetching comments count:', error);
      return 0;
    }

    return data.length;
  };

  const getDislikesCount = async (recipeId) => {
    const { data, error, count } = await supabase
      .from('votes')
      .select('*', { count: 'exact' })
      .eq('recipe_id', recipeId)
      .eq('dislike', true);

    if (error) {
      console.error('Error fetching dislikes count:', error);
      return 0;
    }

    return count;
  };

  const truncateDescription = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const buildReceipts = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin mr-3">
            <svg className="w-5 h-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-xl text-indigo-600">Loading recipes...</p>
        </div>
      );
    }
    return receipts ? (
      receipts.map((receipt) => (
        <div className="m-4 c-receipt__item transform transition duration-500 hover:scale-105" key={receipt.id}>
          <div className="c-receipt__img">
            <img
              src={receipt.imageurl}
              alt={`Tarte au chocolat ${receipt.id}`}
              className="w-full h-72 sm:h-52 object-cover rounded transition duration-500 hover:opacity-90"
              loading="lazy"
            />
          </div>
          <div className={`c-receipt__content h-72 sm:h-52 p-2 bg-white rounded shadow-md transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg  ${darkMode ? 'dark-mode' : ''}`}>
            <Link href={`/recette/${receipt.id}`}>
              <h3 className="text-xl font-bold mb-2 transition-colors duration-500 hover:text-indigo-600">{truncateDescription(receipt.name, 23)}</h3>
            </Link>
            <p className={`text-gray-700 text-sm mb-4 transition-all duration-500 hover:text-gray-600  ${darkMode ? 'text-gray-400' : ''}`}>
              {truncateDescription(receipt.description, 180)}
              <Link href={`/recette/${receipt.id}`}>
                <span className="transition-colors duration-500 hover:text-indigo-600">...Read more !</span>
              </Link>
            </p>
            <div className='flex justify-between items-center'>
              <span className="block text-sm text-gray-500" style={{ fontSize: '13px' }}>Posted the {new Date(receipt.created_at).toLocaleDateString()}</span>

              <div className="flex justify-end space-x-4">
                <div className="flex items-center space-x-2">
                  <FaComment className="text-gray-500" />
                  <span className="text-gray-500 font-bold">{receipt.commentsCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaThumbsUp className="text-green-500" />
                  <span className="text-green-500 font-bold">{receipt.likesCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaThumbsDown className="text-red-500" />
                  <span className="text-red-500 font-bold">{receipt.dislikesCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : null;
  };

  return (
    <ProtectedRoute>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin mr-3">
              <svg className="w-5 h-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-xl text-indigo-600">Loading recipes...</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '5vh' }}>
          <input
            className='mx-auto border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-1/2 transition-all duration-500 ease-in-out focus:w-3/4 focus:shadow-md'
            type="search"
            name="search"
            placeholder="Search for a recipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="c-receipt__list grid gap-4 sm:grid-cols-1 lg:grid-cols-2" style={{ marginTop: '4vh', marginRight: '5vw', marginLeft: '5vw' }}>
            {buildReceipts()}
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export async function getStaticProps() {
  let initialReceipts = [];
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      initialReceipts = data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      initialReceipts,
    },
    revalidate: 1,
  };
}

export default PageReceipts;
