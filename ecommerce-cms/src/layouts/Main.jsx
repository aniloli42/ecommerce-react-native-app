import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useUserContext } from '../context/UserContext';

const Main = ({ children }) => {
  const { user, setUser } = useUserContext();
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const verifyAccessToken = async (token) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AUTH_SERVER_URL}/verify`,
        {
          accessToken: token,
        }
      );

      if (res?.data?.valid === true) {
        setUser(token);
        return;
      }

      throw new Error('Token Invalid');
    } catch (e) {
      console.log(e.message);
      sessionStorage.clear();
      setUser(null);
    }
  };

  useEffect(() => {
    let userStore = sessionStorage.getItem('cms');

    if (!userStore) {
      return setUser(null);
    }

    verifyAccessToken(userStore);
  }, [pathname]);

  useEffect(() => {
    if (user === null) {
      navigate('/login', {
        replace: true,
        state: {
          path: pathname === '/login' ? null : pathname,
        },
      });
    }

    if (user != null && location.pathname === '/login') {
      console.log(state);
      if (state.path == null) return navigate('/', { replace: true });

      navigate(state.path, { replace: true });
    }
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

export default Main;
