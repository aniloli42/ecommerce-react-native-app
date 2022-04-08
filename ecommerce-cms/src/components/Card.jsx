import React from 'react';

const Card = ({ title, count, color, children }) => {
  return (
    <div className="py-4 px-4 min-w-fit  bg-gray-800 shadow shadow-white/10 rounded-md flex gap-4 flex-1 items-center">
      <div
        className="w-[60px] min-h-[60px] rounded-full flex justify-center items-center"
        style={{
          backgroundColor: color ? color : '#ccc',
        }}
      >
        {children}
      </div>
      <div className="mr-8">
        <p className="text-gray-400 font-light text-sm">
          {title ?? 'Card Topic'}
        </p>
        <p className="text-white text-3xl mt-2">{count ?? 0}</p>
      </div>
    </div>
  );
};

export default Card;
