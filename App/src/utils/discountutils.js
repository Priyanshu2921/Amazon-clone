export const calculateDiscountPercentage = (originalPrice, price) => {
    if (!originalPrice || originalPrice <= 0 || price < 0) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };
  