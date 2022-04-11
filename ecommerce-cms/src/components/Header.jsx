import React from 'react';
import { useUserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, setUser } = useUserContext();

  return (
    <header className="bg-gray-800 min-h-fit py-4 px-6 flex justify-between">
      <Link to="/">
        <h1 className="text-white font-bold text-xl md:text-2xl">
          Elegant CMS
        </h1>
      </Link>
      {user != null && (
        <button
          className="text-gray-500 hover:text-gray-400 focus-visible:text-gray-400 hover:underline focus-visible:underline active:text-gray-200 outline-none"
          onClick={() => {
            sessionStorage.clear();
            setUser(null);
          }}
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
