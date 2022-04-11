import { Suspense } from 'react';

const SuspenseLoading = ({ children }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

const Loader = () => {
  return (
    <div className="max-w-xl self-center p-6">
      <p className="text-gray-300 bg-gray-800 p-6 rounded-md">
        Page Loading...
      </p>
    </div>
  );
};

export default SuspenseLoading;
