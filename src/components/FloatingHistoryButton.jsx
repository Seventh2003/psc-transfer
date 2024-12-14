import { Link } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';
import { motion } from 'framer-motion';

function FloatingHistoryButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        to="/history"
        className="flex items-center space-x-2 bg-[--primary] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[--secondary] transition-colors duration-300"
      >
        <FaHistory className="text-xl" />
        <span>Track Conversions</span>
      </Link>
    </motion.div>
  );
}

export default FloatingHistoryButton;
