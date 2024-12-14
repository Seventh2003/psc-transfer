import Cookies from 'js-cookie';

export const saveTransaction = (transactionData) => {
  const existingTransactions = Cookies.get('transactions');
  let transactions = [];
  
  if (existingTransactions) {
    transactions = JSON.parse(existingTransactions);
  }
  
  transactions.push({
    ...transactionData,
    date: new Date().toISOString(),
    status: 'pending'
  });
  
  Cookies.set('transactions', JSON.stringify(transactions), { expires: 30 });
  
  return transactions;
};

export const updateTransactionStatus = (transactionId, newStatus) => {
  const existingTransactions = Cookies.get('transactions');
  
  if (existingTransactions) {
    let transactions = JSON.parse(existingTransactions);
    transactions = transactions.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, status: newStatus }
        : transaction
    );
    
    Cookies.set('transactions', JSON.stringify(transactions), { expires: 30 });
    return transactions;
  }
  
  return [];
};

export const getTransactions = () => {
  const transactions = Cookies.get('transactions');
  return transactions ? JSON.parse(transactions) : [];
};
