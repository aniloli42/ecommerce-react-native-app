import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useUserContext } from '../context/UserContext';

const Main = ({ children }) => {
  const [storedToken, setStoredToken] = useState(() => {
    const userStore = sessionStorage.getItem('cms');

    if (!userStore) return null;
    return userStore;
  });

  const { user, setUser } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const verifyAccessToken = async (token) => {
    try {
      if (token == null) return;

      const res = await axios.post(
        `${import.meta.env.VITE_AUTH_SERVER_URL}/verify`,
        null,
        {
          headers: {
            'access-token': token,
          },
        }
      );

      if (res.data?.accessToken == null) throw new Error('Token Invalid');

      sessionStorage.setItem('cms', res.data.accessToken);
      setUser(res.data.accessToken);
    } catch (e) {
      sessionStorage.clear();
      setStoredToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    setUser(storedToken);
  }, []);

  useEffect(() => {
    if (user === undefined) return;

    if (user === null) {
      if (pathname === '/') return;

      navigate(`/`, {
        replace: true,
      });

      return;
    }

    verifyAccessToken(user);
  }, [user]);

  return (
    <>
      <Header />
      <section className="py-4 px-6 flex justify-start items-start flex-1 flex-shrink-0 flex-col my-6">
        {children}
      </section>
    </>
  );
};

export default () => memo(Main);
