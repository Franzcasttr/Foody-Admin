const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
  return newNumber;
};
export default formatPrice;
