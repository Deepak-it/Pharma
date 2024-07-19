'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteProductModal from './DeleteProductModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Loader from '../loader';
import EditProduct from '../editproduct/page';

const fetchProducts = async () => {
  try {
    const res = await axios.get('/api/fetchProducts');
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const ManageProducts = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // State for showing the edit form

  const handleFetchProducts = async () => {
    setLoading(true);
    const productsData = await fetchProducts();
    setProducts(productsData);
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete('/api/deleteProduct', {
        data: { productId: selectedProduct._id },
      });
      setShowDeleteModal(false);
      handleFetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSave = async (updatedProduct) => {
    setLoading(true);
    try {
      await axios.put('/api/updateProduct', {
        productId: updatedProduct._id,
        updates: {
          productName: updatedProduct.productName,
          productTradeName: updatedProduct.productTradeName,
          productImage: updatedProduct.productImage,
          categoryName: updatedProduct.productCategory,
          productSubCategory: updatedProduct.productSubCategory,
          productAvailableStrength: updatedProduct.productAvailableStrength,
          productAvailableCombination: updatedProduct.productAvailableCombination,
          productPacking: updatedProduct.productPacking,
          productPackInsert: updatedProduct.productPackInsert
        },
      });
      setShowEditForm(false); // Hide the edit form after saving
      setLoading(false);
      handleFetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEditClick = (product) => {
    alert('inside click')
    setSelectedProduct(product);
    setShowEditForm(true); // Show the edit form
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <div className="container">
      {loading ? <Loader /> : (
        <>
          {(showEditForm && selectedProduct) ? 
            <EditProduct
              product={selectedProduct}
              onSave={handleSave}
              onClose={() => setShowEditForm(false)}
            /> : 
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-9">
                  <h2>Manage <b>Products</b></h2>
                </div>
                <div className="col-sm-3">
                  <button onClick={() => router.push('/admin')} className='btn btn-success'>
                    <FontAwesomeIcon className='me-2' icon={faPlus} />Add New Product
                  </button>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Trade name</th>
                  <th style={{ width: '100px' }}>Category</th>
                  <th style={{ width: '100px' }}>Sub category</th>
                  <th>Strength</th>
                  <th>Combination</th>
                  <th>Packing</th>
                  <th>Pack</th>
                  <th>Therapeutic use</th>
                  <th>Production capacity</th>
                  <th style={{ width: '50px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      {product.productImage && (
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      )}
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.productTradeName}</td>
                    <td>{product.category}</td>
                    <td>{product.subCategory}</td>
                    <td>{product.productAvailableStrength}</td>
                    <td>{product.productAvailableCombination}</td>
                    <td>{product.productPacking}</td>
                    <td>{product.productPackInsert}</td>
                    <td>{product.productTherapeuticUse}</td>
                    <td>{product.productProductionCapacity}</td>
                    <td>
                      <span className='edit me-3'>
                        <FontAwesomeIcon
                          onClick={() => handleEditClick(product)}
                          icon={faPencil}
                        />
                      </span>
                      <span className='delete'>
                        <FontAwesomeIcon
                          className='delete'
                          icon={faTrash}
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteModal(true);
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>          }

          <DeleteProductModal
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            handleDelete={handleDelete}
            productName={selectedProduct ? selectedProduct.productName : ''}
          />
        </>
      )}
    </div>
  );
};

export default ManageProducts;
