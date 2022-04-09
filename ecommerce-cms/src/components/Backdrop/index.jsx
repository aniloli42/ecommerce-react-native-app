import { motion } from 'framer-motion';

const Backdrop = ({ children, func }) => {
  return (
    <motion.div
      className="fixed top-0 bottom-0 w-full h-full overflow-hidden flex  justify-center items-start bg-black/50"
      onClick={func}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
