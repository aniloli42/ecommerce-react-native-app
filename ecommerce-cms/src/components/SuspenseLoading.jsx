import { Suspense } from 'react';

const SuspenseLoading = ({ children }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

const Loading = () => {
  return <p className="text-white">Loading</p>;
};

export default SuspenseLoading;
