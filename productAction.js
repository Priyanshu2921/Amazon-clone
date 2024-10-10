import axios from 'axios';
import { fetchCartError } from './cartSlice'; // Import the new action

export const fetchProducts = () => async (dispatch) => {
  try {
    // Replace this with your API endpoint
    const response = await axios.get('/path-to-your/products.json');
    
    // Dispatch success action (you can define it similarly)
    dispatch(addToCart(response.data));
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Dispatch 404 error action
      dispatch(fetchCartError('Oops! 404 Not Found'));
    } else {
      // Handle other errors
      dispatch(fetchCartError('Something went wrong. Please try again.'));
    }
  }
};
