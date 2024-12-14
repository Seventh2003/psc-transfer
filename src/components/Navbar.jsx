import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaHome, FaHistory, FaInfoCircle } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/convert', label: 'Convert', icon: FaExchangeAlt },
    { path: '/history', label: 'History', icon: FaHistory },
    { path: '/about', label: 'About', icon: FaInfoCircle }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <FaExchangeAlt className="text-[--primary] text-2xl" />
              <span className="text-xl font-bold text-[--secondary]">PaySafe Converter</span>
            </Link>
          </motion.div>
          <div className="flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className="nav-link flex items-center space-x-1"
              >
                <item.icon className="text-sm" />
                <span>{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[--primary]"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
