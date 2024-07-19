import React, { useState, useEffect } from 'react';

const EditDialog = ({ show, handleClose, handleSave, product }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setCategory(product.categoryName);
      setSubCategory(product.productSubCategory);
    }
  }, [product]);


  useEffect(() => {
    console.log('selected product details', product)
  })
  const handleSaveClick = () => {
    handleSave({
      ...product,
      productName,
      categoryName: category,
      productSubCategory: subCategory,
    });
  };
  

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title me-2">Edit Product</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="mb-2 form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-2 form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subCategory">Sub Category</label>
              <input
                type="text"
                className="form-control"
                id="subCategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSaveClick}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;
