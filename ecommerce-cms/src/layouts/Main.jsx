import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useUserContext } from '../context/UserContext';

const Main = ({ children }) => {
  const { user, setUser } = useUserContext();
  const location = useLocation();

  useEffect(() => {
    let userStore = sessionStorage.getItem('user');

    if (!userStore) return setUser(null);

    userStore = JSON.parse(userStore);

    setUser(userStore.accessToken ?? null);
  }, []);

  if (user == null && location.pathname != '/login')
    return <Navigate to="/login" />;

  if (user != null && location.pathname == '/login') return <Navigate to="/" />;

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
