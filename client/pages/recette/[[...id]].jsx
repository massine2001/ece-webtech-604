import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../components/supabaseClient';
import Comments from '../../components/Comments';
import { UserContext } from '../appContext';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import ProtectedRoute from '../../components/ProtectedRoute.jsx';

const RecettePageDetails = () => {
  const { user, getUsername } = useContext(UserContext);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [username, setUsername] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);

  const router = useRouter();
  const { id } = router.query;
  const idNumber = parseInt(Array.isArray(id) ? id[0] : id);

  useEffect(() => {
    const subscription = supabase
      .from('votes')
      .on('*', (payload) => {
        const recipe_id = payload.new ? payload.new.recipe_id : payload.old.recipe_id;
        if (recipe_id === idNumber) {
          getLikesCount();
          getDislikesCount();
        }
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [idNumber]);

  const getLikesCount = async () => {
    const { data, error } = await supabase
      .from('votes')
      .select('likee', { count: 'exact' })
      .eq('recipe_id', idNumber)
      .eq('likee', true)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching likes count:', error);
    } else {
      setLikesCount(data.length);
    }
  };

  const getDislikesCount = async () => {
    const { data, error } = await supabase
      .from('votes')
      .select('dislike', { count: 'exact' })
      .eq('recipe_id', idNumber)
      .eq('dislike', true)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching dislikes count:', error);
    } else {
      setDislikesCount(data.length);
    }
  };

  const handleLike = async () => {
    const { data: existingVote, error: existingVoteError } = await supabase
      .from('votes')
      .select('*')
      .eq('recipe_id', idNumber)
      .eq('user_id', user.id);

    if (existingVoteError) {
      console.error('Error checking existing vote:', existingVoteError);
      return;
    }

    if (existingVote && existingVote.length > 0) {
      if (existingVote[0].likee) {
        const { data, error } = await supabase
          .from('votes')
          .delete()
          .eq('id', existingVote[0].id);

        if (error) {
          console.error('Error deleting vote:', error);
        }
      } else {
        const { data, error } = await supabase
          .from('votes')
          .update({ likee: true, dislike: false })
          .eq('id', existingVote[0].id);

        if (error) {
          console.error('Error updating vote:', error);
        }
      }
    } else {
      const { data, error } = await supabase
        .from('votes')
        .insert([{ recipe_id: idNumber, user_id: user.id, likee: true, dislike: false }]);

      if (error) {
        console.error('Error inserting vote:', error);
      }
    }

    getLikesCount();
    getDislikesCount();
  };

  const handleDislike = async () => {
    const { data: existingVote, error: existingVoteError } = await supabase
      .from('votes')
      .select('*')
      .eq('recipe_id', idNumber)
      .eq('user_id', user.id);

    if (existingVoteError) {
      console.error('Error checking existing vote:', existingVoteError);
      return;
    }

    if (existingVote && existingVote.length > 0) {
      if (existingVote[0].dislike) {
        const { data, error } = await supabase
          .from('votes')
          .delete()
          .eq('id', existingVote[0].id);

        if (error) {
          console.error('Error deleting vote:', error);
        }
      } else {
        const { data, error } = await supabase
          .from('votes')
          .update({ likee: false, dislike: true })
          .eq('id', existingVote[0].id);

        if (error) {
          console.error('Error updating vote:', error);
        }
      }
    } else {
      const { data, error } = await supabase
        .from('votes')
        .insert([{ recipe_id: idNumber, user_id: user.id, likee: false, dislike: true }]);

      if (error) {
        console.error('Error inserting vote:', error);
      }
    }

    getLikesCount();
    getDislikesCount();
  };

  useEffect(() => {
    const fetchRecette = async () => {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*, user(*)')
          .eq('id', id);

        if (error) {
          console.error('Error fetching recipe details:', error);
        } else if (data && data.length > 0) {
          setRecipeDetails(data[0]);
          const username = await getUsername(data[0].user_id);
          setUsername(username);
        } else {
          console.log('Recipe not found. Redirecting to error page.');
          router.push('/erreur');
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    if (id) {
      fetchRecette();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getLikesCount();
      getDislikesCount();
    }
  }, [id]);

  if (!recipeDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin mr-3">
          <svg className="w-5 h-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-xl text-indigo-600">Loading the recipe...</p>
      </div>
    );
  }

  const image = {
    imgurl: recipeDetails.imageurl,
  };

  return (
    <>
      <ProtectedRoute>
        <div className='div-im' style={{ backgroundImage: `url(${image.imgurl})` }}></div>
        <div className='div-intermediaire-recette'></div>

        <div className='principal-recette'>
          <div className="mb-3 mx-auto max-w-xs p-1 rounded animate-fade-in-down" style={{ marginTop: '3rem' }}>
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ textDecoration: 'underline' }}>{recipeDetails.name}</h2>
          </div>

          <div className='div-contenu-recette' >
            <div>
              <div className='grand-div-ingredient animate-slide-in-from-left'>
                <div className='medium-div-ingredient'>
                  <h3 className='titre-ingredient'>Ingredients:</h3>
                  <p className='liste-ingredient'>{recipeDetails.ingredients}</p>
                </div>
                <div className='div-instruction animate-slide-in-from-right'>
                  <h3 className='titre-instruction'>Instructions:</h3>
                  {recipeDetails.description.split('\n').map((paragraph, index) => (
                    paragraph.trim() !== "" ? <p key={index} className='liste-instruction'><span>●</span> <span style={{ marginLeft: '1vw' }}>{paragraph}</span></p> : <p key={index} className='liste-instruction'>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className='div-auteur'>
              <h3 className='nom-auteur pb-4'>Posted by : {username} the {new Date(recipeDetails.created_at).toLocaleDateString()}</h3>
              <div className='flex justify-center'>
                <button onClick={handleLike} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                  <FaThumbsUp className="mr-2" /> ({likesCount})
                </button>
                <button onClick={handleDislike} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4 flex items-center">
                  <FaThumbsDown className="mr-2" /> ({dislikesCount})
                </button>
              </div>
            </div>
          </div>

          <Comments recipeId={recipeDetails.id} />

        </div>
      </ProtectedRoute>
    </>
  );
};

export default RecettePageDetails;
