import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      role: "Regular User",
      content: "Best conversion service I've ever used. Fast and reliable!",
      rating: 5
    },
    {
      name: "Jane Smith",
      role: "Business Owner",
      content: "Excellent rates and amazing customer support. Highly recommended!",
      rating: 5
    },
    {
      name: "Mike Johnson",
      role: "Verified Customer",
      content: "Simple to use and instant transfers. Couldn't ask for more!",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover-card"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="border-t pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
