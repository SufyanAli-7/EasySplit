const formatCurrency = (amount, currency = 'INR') => {
  // Handle different currency formats
  if (currency === 'INR' || currency === 'RS') {
    // Format for Indian Rupees with ₹ symbol
    return `₹${new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)}`;
  }

  // Default formatting for other currencies
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default formatCurrency;
