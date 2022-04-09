import { motion } from 'framer-motion';
import Backdrop from '../Backdrop';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
  },
  exit: {
    opacity: 0,
    y: '100vh',
  },
};

const Modal = ({ handleClose, text }) => {
  return (
    <Backdrop func={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="max-w-xl w-full min-h-fit rounded-md p-4 bg-white mx-4 mt-36"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p className="text-gray-500 mb-4">{text}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 w-full"
        >
          Close
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
