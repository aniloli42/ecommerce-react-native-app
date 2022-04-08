import React from 'react';
import { Link } from 'react-router-dom';

const PageCard = ({ title, path }) => {
  return (
    <div className="grid grid-cols-1 gap-2 w-full">
      <div className="bg-gray-800 px-4 py-4 rounded-md">
        <h3 className="text-white text-xl">{title ?? 'Page Title'}</h3>

        <Link to={path}>
          <p className="text-gray-400 text-sm mt-1 hover:underline">
            Manage {title ?? ''}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PageCard;
