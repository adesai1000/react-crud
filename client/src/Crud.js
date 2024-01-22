import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Crud.css';

const Crud = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3000/products')
      .then(res => setProducts(res.data))
      .catch(error => console.log(error.message));
  };

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productImageLink, setProductImageLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editProduct) {
        await axios.put(`http://localhost:3000/products/${editProduct._id}`, {
          name: productName,
          price: productPrice,
          quantity: productQuantity,
          image: productImageLink,
        });
      } else {
        await axios.post('http://localhost:3000/products', {
          name: productName,
          price: productPrice,
          quantity: productQuantity,
          image: productImageLink,
        });
      }

      setProductName('');
      setProductPrice('');
      setProductQuantity('');
      setProductImageLink('');
      setEditProduct(null);

      fetchProducts();
    } catch (error) {
      console.error('Error creating/updating product:', error.message);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);

    setProductName(product.name);
    setProductPrice(product.price);
    setProductQuantity(product.quantity);
    setProductImageLink(product.image);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  return (
    <div>
      <div className='Form'>
        <h2>{editProduct ? 'Edit Product' : 'Create Product'}</h2>
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
            Product Quantity:
            <input
              type="text"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
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
            Image Link:
            <input
              type="text"
              value={productImageLink}
              onChange={(e) => setProductImageLink(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">{editProduct ? 'Update Product' : 'Create Product'}</button>
        </form>
      </div>
      <div className='Table'>
        <h1>Product List</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Image</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
                <td><img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} /></td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Crud;
