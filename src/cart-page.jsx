import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart , clearCartError} from './store/cartslice';
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart); 
  const error = useSelector((state) => state.cart.error); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id); // Remove item if quantity is zero or negative
    } else {
      dispatch(updateCartItem({ id, quantity })); // Dispatch the update action
    }
  };

  const handelShopnow = () => {
    navigate("/"); // Navigate to the shop page
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id })); // Dispatch the remove action
  };

  // Filter out items with quantity of zero
  const filteredCartItems = cartItems.filter(item => item.quantity > 0);
  
  const totalPrice = filteredCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto my-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {filteredCartItems.length === 0 ? (
        <div className="flex items-center">
          <img
            src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" // Image when no items are present
            alt="Image" 
            className="w-[200px] h-[200px] mr-2" 
          />
          <p>
            No items in the cart {"  "}
            <span className="text-blue-600 font-bold cursor-pointer" onClick={handelShopnow}>
              Shop Now
            </span>
          </p>
        </div>
      ) : (
        filteredCartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center p-2 border-b">
            <div className="flex items-center">
              <img
                src={item.images[0]} 
                alt={item.name}
                className="w-16 h-16 object-cover mr-4" // Image size
              />
              <div>
                <h3 className="text-lg">{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="border rounded p-1 w-16"
                  onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                />
              </div>
            </div>
            <button onClick={() => handleRemoveFromCart(item.id)} className="bg-red-500 text-white p-1 rounded">
              Remove
            </button>
          </div>
        ))
      )}
      {filteredCartItems.length > 0 && (
        <h3 className="mt-4 text-xl">Total Price: ₹{totalPrice}</h3>
      )}
      <hr className="my-4" />
    </div>
  );
};

export default CartPage;
