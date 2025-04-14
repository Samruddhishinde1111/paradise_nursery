import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';
import '../pages/CartPage.css';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleIncrease = (id: string) => {
    dispatch(updateQuantity({ id, quantity: 1 }));
  };

  const handleDecrease = (id: string) => {
    dispatch(updateQuantity({ id, quantity: -1 }));
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <div className="cart-item-details">
              <strong>{item.name}</strong>
              <span>₹{item.price}</span>
              <span>Total: ₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div className="cart-item-controls">
              <button onClick={() => handleDecrease(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrease(item.id)}>+</button>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="remove">Delete</button>
            </div>
          </div>
        ))
      )}

      <div className="cart-summary">
        <p>Total Items: {totalItems}</p>
        <p>Total Cost: ₹{totalCost}</p>
      </div>

      <div className="cart-buttons">
        <Link to="/products">
          <button className="continue">Continue Shopping</button>
        </Link>
        <button className="checkout">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
