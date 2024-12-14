import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, FaRocket, FaUserCheck, FaChartLine, 
  FaGlobe, FaUsers, FaStar, FaCheckCircle, FaPaypal,
  FaCreditCard, FaLock, FaHeadset, FaHistory
} from 'react-icons/fa';

function Home() {
  const stats = [
    { number: "50K+", label: "Satisfied Users" },
    { number: "€5M+", label: "Successfully Converted" },
    { number: "99.9%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[--secondary] to-[--primary] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Convert Paysafecard to PayPal
                <span className="text-yellow-400"> Securely</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                The most trusted platform for converting your Paysafecard balance to PayPal. Professional service with verified security.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/convert" 
                  className="btn-primary bg-white text-[--primary] hover:bg-gray-100">
                  Start Converting
                </Link>
                <a href="#how-it-works" 
                  className="btn-primary bg-transparent border-2 border-white hover:bg-white/10">
                  How It Works
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <FaShieldAlt className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Verified Security</h3>
                    <p className="text-sm text-gray-300">Professional Conversion Service</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: FaLock, text: "SSL Encrypted Transactions" },
                    { icon: FaUserCheck, text: "Staff Verification Process" },
                    { icon: FaHistory, text: "Transaction Tracking" },
                    { icon: FaHeadset, text: "24/7 Support Available" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg"
                    >
                      <item.icon className="text-yellow-400" />
                      <span className="text-sm">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/30 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-4xl font-bold text-[--primary] mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Professional Conversion Process</h2>
            <p className="text-xl text-gray-600">Secure and verified conversion in simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                icon: FaCreditCard,
                title: "Submit Details",
                description: "Enter your Paysafecard PIN and amount"
              },
              {
                step: "02",
                icon: FaUserCheck,
                title: "Staff Verification",
                description: "Our team verifies your submission"
              },
              {
                step: "03",
                icon: FaShieldAlt,
                title: "Security Check",
                description: "Transaction security verification"
              },
              {
                step: "04",
                icon: FaPaypal,
                title: "Receive Funds",
                description: "Get your money in PayPal"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl font-bold text-gray-100 absolute -top-4 right-4">
                  {step.step}
                </div>
                <step.icon className="text-[--primary] text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-2 relative z-10">{step.title}</h3>
                <p className="text-gray-600 relative z-10">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">Professional service with premium features</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaShieldAlt,
                title: "Secure Platform",
                description: "Bank-grade security protocols and encrypted transactions"
              },
              {
                icon: FaHeadset,
                title: "24/7 Support",
                description: "Professional support team always ready to help"
              },
              {
                icon: FaHistory,
                title: "Transaction Tracking",
                description: "Real-time updates on your conversion status"
              },
              {
                icon: FaUsers,
                title: "Verified Service",
                description: "Trusted by thousands of satisfied users"
              },
              {
                icon: FaGlobe,
                title: "Global Coverage",
                description: "Support for multiple countries and currencies"
              },
              {
                icon: FaLock,
                title: "Secure Storage",
                description: "Your data is encrypted and safely stored"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <feature.icon className="text-[--primary] text-3xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FaLock, text: "SSL Security", subtext: "256-bit encryption" },
              { icon: FaUserCheck, text: "Verified Service", subtext: "Professional team" },
              { icon: FaShieldAlt, text: "Secure Platform", subtext: "Protected transactions" },
              { icon: FaHeadset, text: "Premium Support", subtext: "Always available" }
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                <badge.icon className="text-[--primary] text-3xl mb-2 mx-auto" />
                <h4 className="font-semibold">{badge.text}</h4>
                <p className="text-sm text-gray-600">{badge.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[--secondary] to-[--primary] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Convert?</h2>
            <p className="text-xl mb-8">Start your secure conversion process now</p>
            <Link 
              to="/convert"
              className="inline-block bg-white text-[--primary] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              Start Converting
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
