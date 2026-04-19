import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    rating: 5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Product added successfully!');
      setNewProduct({
        name: '',
        price: '',
        category: '',
        image: '',
        rating: 5
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        alert('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin">
      <div className="container">
        <h1>Admin Panel</h1>

        <div className="admin-section">
          <h2>Add New Product</h2>
          <form onSubmit={handleProductSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">Add Product</button>
          </form>
        </div>

        <div className="admin-section">
          <h2>Products ({products.length})</h2>
          <div className="products-list">
            {products.map(product => (
              <div key={product._id} className="product-item">
                <img src={product.image} alt={product.name} className="product-thumb" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <p>{product.category}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Orders ({orders.length})</h2>
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-item">
                <div className="order-info">
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Total:</strong> ${order.total}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>Items:</strong> {order.items.length}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;