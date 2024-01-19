import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ refreshProducts }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productImageLink, setProductImageLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/products', {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        image: productImageLink,
      });

      console.log('Product created:', response.data);
      
      refreshProducts();
    } catch (error) {
      console.error('Error creating product:', error.message);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Product Price:
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Product Quantity:
          <input
            type="text"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image Link:
          <input
            type="text"
            value={productImageLink}
            onChange={(e) => setProductImageLink(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
