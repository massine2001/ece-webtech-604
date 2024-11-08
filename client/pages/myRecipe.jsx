import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../components/supabaseClient';
import { UserContext } from './appContext';
import { useRouter } from 'next/router';
import { AppContext } from './appContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';


const MyRecipe = () => {
  const { darkMode } = useContext(AppContext);

  const router = useRouter();
  const { user } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [newRecipeData, setNewRecipeData] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (user) {
      fetchRecipes();
    }
  }, [user]);

  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching recipes:', error);
    } else {
      setRecipes(data);
    }
  };

  const handleDeleteClick = async (recipeId) => {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', recipeId);

    if (error) {
      console.error('Error deleting recipe:', error);
      setMessage('Erreur lors de la suppression de la recette.');
    } else {
      fetchRecipes();
      setMessage('Recette supprimée.');
      setMessageType('error');
    }
    setTimeout(() => setMessage(''), 5000);
  };

  const handleEditClick = (recipeId) => {
    setEditingRecipeId(recipeId);
    window.scrollTo(0, 0);
  };

  const handleSaveClick = async (recipeId) => {
    const { error } = await supabase
      .from('recipes')
      .update(newRecipeData)
      .eq('id', recipeId);

    if (error) {
      console.error('Error updating recipe:', error);
      setMessage('Erreur lors de la mise à jour de la recette.');
    } else {
      fetchRecipes();
      setEditingRecipeId(null);
      setNewRecipeData({});
      setMessage('Recette mise à jour avec succès.');
      setMessageType('success');
      window.scrollTo(0, 0);
    }
    setTimeout(() => setMessage(''), 5000);
  };

  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const nextRecipe = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const prevRecipe = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  const handleInputChange = (value, fieldName) => {
    setNewRecipeData({ ...newRecipeData, [fieldName]: value });
  };

  const styles = {
    width: '170vw',
    maxWidth: '100%',
    margin: '0 auto',
    '@media (min-width: 768px)': {
      width: '60vw',
    },
  };
  
  return (
    <ProtectedRoute>
      <div className={`min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 relative ${darkMode ? 'dark-mode' : ''}`}>
        <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl  hover:rotate-[-3deg] hover:translate-x-[-6px] transition-transform duration-500 hidden sm:block"></div>
          <div className={`relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20  hover:scale-105 transition-transform duration-1000  ${darkMode ? 'rkmode' : ''}`}  style={styles}>
            <div className='flex flex-row justify-around items-center'>
              <button onClick={prevRecipe} className="bg-white p-4 rounded-full shadow-md">Previous</button>
              <h1 className={`text-3xl font-bold text-center mb-8  ${darkMode ? 'text-gray-400' : ''}`}>My recipes</h1>
              <button onClick={nextRecipe} className="bg-white p-4 rounded-full shadow-md">Next</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', height: '20px' }}>
              <span className={`text-center ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>{message}</span>
            </div>
            {recipes.length > 0 ? (
              <div key={recipes[currentRecipeIndex].id} className={`mb-8 p-3 bg-white rounded-lg shadow-md  ${darkMode ? 'bg-gray-700' : ''}`}>
                {editingRecipeId === recipes[currentRecipeIndex].id ? (
                  <>
                    <label className={`block text-gray-700 ${darkMode ? 'text-gray-400' : ''}`}>Name of the recipe</label>
                    <input
                      value={newRecipeData.name || recipes[currentRecipeIndex].name}
                      onChange={(e) => handleInputChange(e.target.value, 'name')}
                      className="mt-4 mb-4 text-gray-700 block w-full h-full bg-gradient-to-r from-green-400 to-blue-500 border-none rounded-lg p-4"
                    />

                    <label className={`block text-gray-700 ${darkMode ? 'text-gray-400' : ''}`}>Image URL</label>

                    <input
                      value={newRecipeData.imageurl || recipes[currentRecipeIndex].imageurl}
                      onChange={(e) => handleInputChange(e.target.value, 'imageurl')}
                      className="mt-4 mb-4 text-gray-700 block w-full h-full bg-gradient-to-r from-green-400 to-blue-500 border-none rounded-lg p-4"
                    />
                    <label className={`block text-gray-700 ${darkMode ? 'text-gray-400' : ''}`}>Ingredients</label>

                    <textarea
                      value={newRecipeData.ingredients || recipes[currentRecipeIndex].ingredients}
                      onChange={(e) => handleInputChange(e.target.value, 'ingredients')}
                      className="mt-4 mb-4 text-gray-700 block w-full h-36 bg-gradient-to-r from-green-400 to-blue-500 border-none rounded-lg p-4"
                    />
                    <label className={`block text-gray-700 ${darkMode ? 'text-gray-400' : ''}`}>Description</label>

                    <textarea
                      value={newRecipeData.description || recipes[currentRecipeIndex].description}
                      onChange={(e) => handleInputChange(e.target.value, 'description')}
                      className="mt-4 mb-4 text-gray-700 block w-full h-screen bg-gradient-to-r from-green-400 to-blue-500 border-none rounded-lg p-4"
                    />
                    <div className="flex justify-evenly pb-4">
                      <button
                        onClick={() => setEditingRecipeId(null)}
                        className="mt-4 py-2 px-12 text-center text-white bg-red-500 hover:bg-red-600 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveClick(recipes[currentRecipeIndex].id)}
                        className="mt-4 py-2 px-12 text-center text-white bg-green-500 hover:bg-green-600 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className={`text-2xl font-bold text-gray-900 ${darkMode ? 'text-gray-400' : ''}`}>{recipes[currentRecipeIndex].name}</h2>
                    <img
                      src={recipes[currentRecipeIndex].imageurl}
                      alt={recipes[currentRecipeIndex].name}
                      className="mt-4 w-full h-64 object-cover rounded-md"
                      style={{ borderRadius: '18px' }}
                    />
                    <p className={`mt-8 text-black-700 ${darkMode ? 'text-gray-400' : ''}`}>● Ingredients :</p>
                    <p className={`mt-4 text-gray-700 ${darkMode ? 'text-gray-400' : ''}`}>{recipes[currentRecipeIndex].ingredients}</p>
                    <p className={`mt-4 text-black-700 ${darkMode ? 'text-gray-400' : ''}`}>● Instructions :</p>
                    <p className={`mt-4 text-gray-700 ${darkMode ? 'text-gray-400' : ''}`}>{recipes[currentRecipeIndex].description}</p>
                    <div className="flex justify-evenly pb-4">
                      <button
                        onClick={() => handleDeleteClick(recipes[currentRecipeIndex].id)}
                        className="mt-4 py-2 px-12 text-center text-white bg-red-500 hover:bg-red-600 rounded-md"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditClick(recipes[currentRecipeIndex].id)}
                        className="mt-4 py-2 px-12 text-center text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center ${darkMode ? 'bg-gray-700' : ''}`}>
                <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${darkMode ? 'text-gray-400' : ''}`}>You don't have any recipes yet !</h2>
                <p className={`text-gray-700 mb-4 ${darkMode ? 'text-gray-400' : ''}`}>Start creating your own delicious recipes now.</p>
                <button
                  onClick={() => router.push('/addRecipe')}
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Create a recipe
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MyRecipe;
