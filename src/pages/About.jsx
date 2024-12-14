import { motion } from 'framer-motion';
import { FaCheckCircle, FaShieldAlt, FaUserClock, FaGlobe } from 'react-icons/fa';

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">About Our Service</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide a secure and reliable platform for converting your Paysafecard balance to PayPal.
          Our service is trusted by thousands of users worldwide.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-semibold mb-6">Why Choose Us?</h3>
          <ul className="space-y-4">
            {[
              'Best conversion rates in the market',
              'Instant transfers to your PayPal account',
              'Secure and encrypted transactions',
              '24/7 customer support',
              'No hidden fees',
              'User-friendly interface'
            ].map((item, index) => (
              <motion.li 
                key={index} 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FaCheckCircle className="text-green-500" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-semibold mb-6">How It Works</h3>
          <div className="space-y-6">
            {[
              {
                icon: FaShieldAlt,
                title: "1. Enter Your Details",
                desc: "Input your Paysafecard amount and PayPal email address."
              },
              {
                icon: FaUserClock,
                title: "2. Confirm Conversion",
                desc: "Review the conversion rate and final amount you'll receive."
              },
              {
                icon: FaGlobe,
                title: "3. Receive Funds",
                desc: "Get your money instantly transferred to your PayPal account."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <step.icon className="text-[--primary] text-xl" />
                  <h4 className="text-lg font-semibold">{step.title}</h4>
                </div>
                <p className="text-gray-600 mt-2 ml-8">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
