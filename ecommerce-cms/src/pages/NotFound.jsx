import { MdErrorOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

const iconStyle = {
  width: '7em',
  height: 'auto',
  fill: '#fff',
};

const NotFound = () => {
  return (
    <div className="w-screen flex flex-col items-center mt-24 h-screen">
      <MdErrorOutline style={iconStyle} />
      <p className="text-white text-3xl font-bold mt-4">Error 404</p>

      <p className="text-gray-300 mt-8 px-8 text-center">
        Page not found. Check the address is correct or
        <Link
          to="/"
          className="text-gray-400 ml-1 hover:underline focus-within:underline outline-none"
          replace
        >
          Go Back.
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
