import { Suspense } from 'react';
import Header from '../components/Header';

const Main = ({ children }) => {
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
