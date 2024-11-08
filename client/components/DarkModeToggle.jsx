import { FaMoon, FaSun } from 'react-icons/fa';

function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? (
        <>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span className='c-nav-dark-en' style={{ fontSize: '12px' }}>Mode </span>
            <FaSun />
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span className='c-nav-dark-en' style={{ fontSize: '12px' }}>Mode </span>
            <FaMoon />
          </div>
        </>
      )}
    </button>
  );
}

export default DarkModeToggle;
