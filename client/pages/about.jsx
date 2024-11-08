import React, { useContext } from 'react';
import { AppContext } from './appContext.jsx';

const AboutPage = () => {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={`containerContact mx-auto px-8 py-20 ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className={`text-4xl font-bold mb-8 text-center ${darkMode ? 'dark-mode' : ''}`}>
        About Our Recipes Website
      </h1>

      <div className={`mb-8 ${darkMode ? 'dark-mode' : ''}`}>
        <p className={`text-lg ${darkMode ? 'dark-mode' : ''}`}>
          Welcome to our recipe site, the perfect place to explore, learn, and enjoy the art of cooking.
          OUR passion for food and culinary creativity drives us to share delicious recipes, tips, and
          inspiring stories.
        </p>
      </div>

      <div className={`mb-8 ${darkMode ? 'dark-mode' : ''}`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'dark-mode' : ''}`}>Our Story</h2>
        <p className={`text-lg ${darkMode ? 'dark-mode' : ''}`}>
          Founded with love by AGHARMIOU Massine our recipe website started as a simple idea for a web project.
          We started sharing our favorite recipes and cooking tips with friends and loved ones.
        </p>
      </div>

      <div className={`mb-8 ${darkMode ? 'dark-mode' : ''}`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'dark-mode' : ''}`}>What we offer</h2>
        <p className={`text-lg ${darkMode ? 'dark-mode' : ''}`}>
          Our collection of recipes is diverse, ranging from traditional dishes to innovative creations. We
          put emphasis on quality ingredients, detailed cooking techniques, and tips to make every meal
          becomes an unforgettable experience.
        </p>
      </div>

      <div className={`mb-8 ${darkMode ? 'dark-mode' : ''}`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'dark-mode' : ''}`}>The Community</h2>
        <p className={`text-lg ${darkMode ? 'dark-mode' : ''}`}>
          Join our community of cooking enthusiasts. Share your own recipes, discover exclusive tips, and
          connect with other chefs around the world. Together we create an enriching dining experience.
        </p>
      </div>

      <div className={`mb-8 ${darkMode ? 'dark-mode' : ''}`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'dark-mode' : ''}`}>Our Engagement</h2>
        <p className={`text-lg ${darkMode ? 'dark-mode' : ''}`}>
          We are committed to inspiring your creativity in the kitchen and providing you with a user-friendly
          platform to learn, share, and grow. Thank you for being part of our culinary history. Explore,
          cook, and enjoy!
        </p>
      </div>

      <div>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'dark-mode' : ''}`}>Contact Us</h2>
        <p className={`text-lg ${darkMode ? 'dark-mode' : ''}`}>
          Do you have questions, suggestions, or just want to say hello? We love hearing from you.
          Contact us at agharmioumassine@gmail.com
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
