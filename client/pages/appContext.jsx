import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../components/supabaseClient';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [data, setData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppContext.Provider value={{ data, setData, darkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
}

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const getUserData = async (userId) => {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user data', error);
    } else {
      setUser(data);
    }
  };

  const updateUser = async (newUserInfo) => {
    if (!user) {
      console.error('User is not defined');
      return;
    }

    const { error } = await supabase
      .from('user')
      .update(newUserInfo)
      .eq('id', user.id);

    if (error) {
      console.error('Error updating user', error);
      return false;
    } else {
      setUser(newUserInfo);
      return true;
    }
  };

  const updateComment = async (id, text, fetchComments) => {
    const { data, error } = await supabase
      .from('comments')
      .update({ text, update_at: new Date() })
      .eq('id', id);

    if (error) {
      console.error('Error updating comment:', error);
    } else {
      fetchComments();
    }
  };

  const deleteComment = async (commentId) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const fetchCommentCount = async (recipeId) => {
    const { data, error } = await supabase
      .from('comments')
      .select('id')
      .eq('id_recipe', recipeId);

    if (error) {
      console.error('Error fetching comment count:', error);
      return null;
    } else {
      return data.length;
    }
  };

  const login = async () => {
    let { error } = await supabase.auth.signIn({
      provider: 'github',
    });
    if (error) {
      setErrorMessage(error.message);
      console.error('Error logging massine in', error);
    } else {
      setErrorMessage('');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const getUsername = async (userId) => {
    const { data, error } = await supabase
      .from('user')
      .select('username')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching username', error);
      return null;
    } else {
      return data.username;
    }
  };

  const getEmail = async (userId) => {
    const { data, error } = await supabase
      .from('user')
      .select('email')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching username email', error);
      return null;
    } else {
      return data.email;
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        if (currentUser) {
          getUserData(currentUser.id);
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const loginWithEmail = async (email, password) => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      console.error('Error logging in:', error);
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('Incorrect credentials');
      } else {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage('Congratulations ! You are now logged in.');
    }
  };
  
  const signUpWithEmail = async (email, password) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    setErrorMessage('Invalid email');
    return;
  }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error signing up:', error);
      if (error.code === '23505') {
        setErrorMessage('You are already registered. Please log in.');
      } else {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage('Congratulations ! You are now registered. You can log in.');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUserData,
        updateUser,
        login,
        logout,
        errorMessage,
        setErrorMessage,
        getUsername,
        getEmail,
        fetchCommentCount,
        deleteComment,
        updateComment,
        loginWithEmail,
        signUpWithEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default function () {}
