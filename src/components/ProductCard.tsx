import React from 'react';
import '../styles/ProductCard.css';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  addToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image, addToCart }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>₹{price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
