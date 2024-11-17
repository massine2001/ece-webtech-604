import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from './appContext.jsx';
import { useRouter } from 'next/router';
import { AppContext } from './appContext.jsx';

const Form = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [mode, setMode] = useState('email');
  const [mode2, setMode2] = useState('connexion');
  const { darkMode } = useContext(AppContext);

  const { login } = useContext(UserContext);
  const { loginWithEmail, signUpWithEmail } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginWithEmail(email, password);
      setIsError(false);
      setErrorMessage('Bienvenue '+email);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };
  
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUpWithEmail(email, password);
      setIsError(false);
      setErrorMessage('Congats! You are now signed up.');
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  /*useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);*/


  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="button-group">
        <button onClick={() => setMode('github')} className={`button button-github ${mode === 'github' ? 'selected' : ''}`}>
          <span className={`${darkMode ? 'text-white' : ''}`}>GitHub</span>
        </button>
        <button onClick={() => setMode('email')} className={`button button-email ${mode === 'email' ? 'selected' : ''}`}>
          <span className={`${darkMode ? 'text-white' : ''}`}>Email</span>
        </button>
      </div>
      <div className='entre3'></div>
      {mode === 'github' ? (
        <button onClick={login} style={{ margin: '10px 0', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#f4b400', color: 'white' }}>Sign in with GitHub</button>
      ) : null}
      {mode === 'email' ? (
        <div>
          <div className="button-group">
            <button onClick={() => setMode2('connexion')} className={`button button-co ${mode2 === 'connexion' ? 'selected' : ''}`}>
              <span className={`${darkMode ? 'text-white' : ''}`}>Sign in</span>
            </button>
            <button onClick={() => setMode2('inscription')} className={`button button-in ${mode2 === 'inscription' ? 'selected' : ''}`}>
              <span className={`${darkMode ? 'text-white' : ''}`}>Sign up</span>
            </button>
          </div>
          <div className='entre3'></div>
          {mode2 === 'connexion' ? (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
              <input placeholder='Your e-mail !' type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ margin: '10px 0', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
              <input placeholder='Your password !' type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ margin: '10px 0', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
              {errorMessage && <div style={{ color: isError ? 'red' : 'green', textAlign: 'center' }}>{errorMessage}</div>}
              <button type="submit" style={{ margin: '10px 0', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: 'green', color: 'white' }}>Sign in</button>
            </form>
          ) : null}
          {mode2 === 'inscription' ? (
            <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
              <input placeholder='Your e-mail !' type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ margin: '10px 0', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
              <input placeholder='Your password !' type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ margin: '10px 0', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
              {errorMessage && <div style={{ color: isError ? 'red' : 'green', textAlign: 'center' }}>{errorMessage}</div>}
              <button type="submit" style={{ margin: '10px 0', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#4285f4', color: 'white' }}>Sign up</button>
            </form>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const loggingPage = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default loggingPage;
