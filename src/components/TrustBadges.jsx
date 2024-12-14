import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserCheck, FaCreditCard, FaLock } from 'react-icons/fa';

function TrustBadges() {
  const badges = [
    { icon: FaShieldAlt, text: "100% Secure", subtext: "Protected transactions" },
    { icon: FaUserCheck, text: "10k+ Users", subtext: "Trust our service" },
    { icon: FaCreditCard, text: "Instant Transfer", subtext: "No waiting time" },
    { icon: FaLock, text: "SSL Protected", subtext: "256-bit encryption" }
  ];

  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="trust-badge"
            >
              <badge.icon className="text-[--primary] text-2xl" />
              <div>
                <p className="font-semibold">{badge.text}</p>
                <p className="text-sm text-gray-600">{badge.subtext}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrustBadges;
