'use client'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

const EditProduct = ({ product, onSave, onClose, categories, subcategories }) => {
  const [productName, setProductName] = useState('');
  const [productTradeName, setProductTradeName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');
  const [productAvailableStrength, setProductAvailableStrength] = useState('');
  const [productAvailableCombination, setProductAvailableCombination] = useState('');
  const [productPacking, setProductPacking] = useState('');
  const [productPackInsert, setProductPackInsert] = useState('');
  const [productTherapeuticUse, setProductTherapeuticUse] = useState('');
  const [productProductionCapacity, setProductProductionCapacity] = useState('');
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    if (product) {
      setProductName(product.productName || '');
      setProductTradeName(product.productTradeName || '');
      setProductCategory(product.productCategory || '');
      setProductSubCategory(product.productSubCategory || '');
      setProductAvailableStrength(product.productAvailableStrength || '');
      setProductAvailableCombination(product.productAvailableCombination || '');
      setProductPacking(product.productPacking || '');
      setProductPackInsert(product.productPackInsert || '');
      setProductTherapeuticUse(product.productTherapeuticUse || '');
      setProductProductionCapacity(product.productProductionCapacity || '');
      setProductImage(product.productImage || null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'productName':
        setProductName(value);
        break;
      case 'productTradeName':
        setProductTradeName(value);
        break;
      case 'productCategory':
        setProductCategory(value);
        break;
      case 'productSubCategory':
        setProductSubCategory(value);
        break;
      case 'productAvailableStrength':
        setProductAvailableStrength(value);
        break;
      case 'productAvailableCombination':
        setProductAvailableCombination(value);
        break;
      case 'productPacking':
        setProductPacking(value);
        break;
      case 'productPackInsert':
        setProductPackInsert(value);
        break;
      case 'productTherapeuticUse':
        setProductTherapeuticUse(value);
        break;
      case 'productProductionCapacity':
        setProductProductionCapacity(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const updatedProduct = {
      ...product,
      productName,
      productTradeName,
      productCategory,
      productSubCategory,
      productAvailableStrength,
      productAvailableCombination,
      productPacking,
      productPackInsert,
      productTherapeuticUse,
      productProductionCapacity,
      productImage,
    };
    onSave(updatedProduct);
  };

  return (
    <div className="container">
      <div>
      <FontAwesomeIcon icon = {faLongArrowAltLeft}/>
      </div>
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-9">
              <h2>Edit <b>Product</b></h2>
            </div>
          </div>
        </div>
            <div className="mt-3 row">
              <div className="col-md-8 mb-4">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Product details</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="productName"
                              name="productName"
                              value={productName}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="productName">Product name</label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="productTradeName"
                              name="productTradeName"
                              value={productTradeName}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="productTradeName">Trade name</label>
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="productCategory">Category</label>
                        <select
                          id="productCategory"
                          name="productCategory"
                          className="form-control"
                          onChange={handleChange}
                          value={productCategory}
                        >
                          <option value="">Select a category</option>
                          {categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.category}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="productSubCategory">Sub Category</label>
                        <select
                          id="productSubCategory"
                          name="productSubCategory"
                          className="form-control"
                          onChange={handleChange}
                          value={productSubCategory}
                        >
                          <option value="">Select a subcategory</option>
                          {subcategories?.map((subcategory, index) => (
                            <option key={index} value={subcategory}>
                              {subcategory}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="productAvailableStrength"
                              name="productAvailableStrength"
                              value={productAvailableStrength}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="productAvailableStrength">Available strength</label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="productAvailableCombination"
                              name="productAvailableCombination"
                              value={productAvailableCombination}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="productAvailableCombination">Available Combination</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="productPacking"
                              name="productPacking"
                              value={productPacking}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="productPacking">Packing</label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="productPackInsert"
                              name="productPackInsert"
                              value={productPackInsert}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="productPackInsert">Pack insert/Leaflet</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="productTherapeuticUse"
                              name="productTherapeuticUse"
                              value={productTherapeuticUse}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="productTherapeuticUse">Therapeutic use</label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="productProductionCapacity"
                              name="productProductionCapacity"
                              value={productProductionCapacity}
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="productProductionCapacity">Production Capacity</label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Image</h5>
                  </div>
                  <div className="card-body">
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      name="productImage"
                      onChange={handleImageChange}
                    />
                    {productImage && (
                      <img
                        src={productImage}
                        alt="Selected"
                        style={{ display: 'block', maxWidth: '100%', marginTop: '20px' }}
                      />
                    )}
                    <button onClick={handleSubmit} type="button" className="btn btn-primary btn-lg btn-block mt-3">
                      Save Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default EditProduct;
