import Layout from "../Layout";
import React, { useContext, useEffect } from 'react';
import '../global.css';
import { AppProvider, UserProvider, AppContext } from './appContext';

const MainComponent = ({ Component, pageProps }) => {
  const { darkMode } = useContext(AppContext);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <UserProvider>
        <MainComponent Component={Component} pageProps={pageProps} />
      </UserProvider>
    </AppProvider>
  );
}