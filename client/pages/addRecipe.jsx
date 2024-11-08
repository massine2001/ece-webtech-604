import React, { useState, useContext } from 'react';
import { supabase } from '../components/supabaseClient';
import { AppContext } from './appContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute';

const AddRecipePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_center,h_480,q_60,w_480/v1/clients/asheville/curcio20110715avlcvb013_9a329ea5-ea4d-4533-87b5-7a37a781b554.jpg');
  const [ingredients, setIngredients] = useState('');
  const [message, setMessage] = useState('');
  const { darkMode } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('recipes')
      .insert([
        {
          name,
          description,
          imageurl: imageUrl,
          user_id: supabase.auth.user().id,
          ingredients,
        },
      ]);

    if (error) {
      console.error('Error adding recipe:', error);
    } else {
      console.log('Recipe added successfully:', data);
      setName('');
      setDescription('');
      setImageUrl('https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_center,h_480,q_60,w_480/v1/clients/asheville/curcio20110715avlcvb013_9a329ea5-ea4d-4533-87b5-7a37a781b554.jpg');
      setIngredients('');
      setMessage('Recipe added successfully');
      window.scrollTo(0, 0);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen mt-10 py-3 sm:max-w-4xl sm:mx-auto flex items-center justify-center">
        <div className="absolute inset-0 w-8/12 bg-gradient-to-r from-red-400 to-red-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-40 sm:-rotate-6 hover:rotate-[-8deg] hover:translate-x-[-6px] transition-transform duration-500"></div>
        <div className={`relative max-w-2xl w-full space-y-8 bg-white p-10 hover:scale-105 transition-transform duration-1000 sm:rounded-3xl shadow-md  ${darkMode ? 'dark-mode' : ''}`}>
          <div>
            {message && <span className={`${darkMode ? 'dark-mode' : ''}`} style={{ color: 'green', textAlign: 'center' }}>{message}</span>}
            <h2 className={`mt-6 text-center text-3xl font-bold text-gray-900 ${darkMode ? 'dark-mode' : ''}`}>
              Add a new recipe
            </h2>
          </div>
          <form className={`mt-8 space-y-6 ${darkMode ? 'dark-mode' : ''}`} onSubmit={handleSubmit}>
            <div className={`grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 ${darkMode ? 'dark-mode' : ''}`}>
              <div>
                <label htmlFor="name" className={`block text-sm font-medium text-gray-700 ${darkMode ? 'dark-mode' : ''}`}>Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  maxLength={255}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
                  placeholder="e.g., Apple Pie"
                />
              </div>
              <div>
                <label htmlFor="imageUrl" className={`block text-sm font-medium text-gray-700 ${darkMode ? 'dark-mode' : ''}`}>Image URL</label>
                <input
                  id="imageUrl"
                  maxLength={255}
                  name="imageUrl"
                  type="text"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
                  placeholder="e.g., https://example.com/apple-pie.jpg"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="ingredients" className={`block text-sm font-medium text-gray-700 ${darkMode ? 'dark-mode' : ''}`}>Ingredients</label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={ingredients}
                  onChange={e => setIngredients(e.target.value)}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md h-40"
                  placeholder="e.g.,\n- 2 apples\n- 1 pie crust\n- 1/2 cup of sugar\n- 1 tsp of cinnamon"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className={`block text-sm font-medium text-gray-700 ${darkMode ? 'dark-mode' : ''}`}>Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md h-40"
                  placeholder="e.g., A delicious apple pie made with fresh apples and a flaky crust."
                />
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Add Recipe
                </button>
              </div>
            </div>
          </form>
          <div className="mt-8">
            <h2 className={`text-2xl text-center font-bold text-gray-900 ${darkMode ? 'dark-mode' : ''}`}>Preview</h2>
            <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl text-center font-bold text-gray-900">{name}</h3>
              <img src={imageUrl} alt={name} className="mt-4 w-full h-64 object-cover rounded-md" />
              <p className="mt-4 text-gray-700 whitespace-pre-line">{description}</p>
              <h4 className="mt-6 text-lg font-bold text-gray-900">Ingredients</h4>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{ingredients}</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AddRecipePage;
