'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
  BtnUnderline,
  BtnRedo,
  BtnUndo,
  BtnStrikeThrough,
  BtnBulletList,
  BtnNumberedList,
  BtnLink,
  BtnClearFormatting,
  HtmlButton,
  BtnStyles
} from 'react-simple-wysiwyg';

export default function Admin() {
    const router = useRouter();
    const subcategories = [
        "Tablet", "Capsule", "Eye/Ear drops", "Injection", "Creams", "Suspension/Syrup", "Other"
    ];

    const [product, setProduct] = useState({
        productName: "",
        productTradeName: "",
        productImage: null,
        productCategory: "",
        productSubCategory: "",
        productAvailableStrength: "",
        productAvailableCombination: "",
        productPacking: "",
        productPackInsert: "",
        productTherapeuticUse: "",
        productProductionCapacity: ""
    });

    const [category, setCategory] = useState({
        categoryName: "",
    });

    const [categories, setCategories] = useState([]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const { name } = event.target;
                if (name === "productImage") {
                    setProduct((prevData) => ({
                        ...prevData,
                        productImage: e.target.result
                    }));
                } else {
                    setCategory((prevData) => ({
                        ...prevData,
                        subCategoryImage: e.target.result
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "categoryName") {
            setCategory((prevData) => ({
                ...prevData,
                [name]: value
            }));
        } else {
            setProduct((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const [templatevalue, setTemplateValue] = useState('simple text');

    function onTemplateChange(e) {
      setTemplateValue(e.target.value);
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/fetchCategories');
            const data = await response.json();
            setCategories(data); // Assuming the response has a 'categories' field
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/pharma', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const result = await response.json();
            if (result) {
                router.push('/category');
            }
            console.log(result.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit2 = async () => {
        debugger;
        const body = {
            category: category.categoryName,
        };
        try {
            const response = await fetch('/api/categoriesAdd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-9">
                            <h2>Add <b>Something</b></h2>
                        </div>
                    </div>
                </div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Add Product</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Add Category</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Template Editor</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
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
                                                        <input type="text" id="productName" name="productName" onChange={handleChange} className="form-control" />
                                                        <label className="form-label" htmlFor="productName">Product name</label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <input type="text" id="productTradeName" name="productTradeName" onChange={handleChange} className="form-control" />
                                                        <label className="form-label" htmlFor="productTradeName">Trade name</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="productCategory">Category</label>
                                                <select id="productCategory" name="productCategory" className="form-control" onChange={handleChange} value={product.productCategory}>
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
                                                <select id="productSubCategory" name="productSubCategory" className="form-control" onChange={handleChange} value={product.productSubCategory}>
                                                    <option value="">Select a subcategory</option>
                                                    {subcategories.map((subcategory, index) => (
                                                        <option key={index} value={subcategory}>
                                                            {subcategory}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <input type="text" id="productAvailableStrength" name="productAvailableStrength" onChange={handleChange} className="form-control" />
                                                        <label className="form-label" htmlFor="productAvailableStrength">Available strength</label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <input type="text" id="productAvailableCombination" name="productAvailableCombination" onChange={handleChange} className="form-control" />
                                                        <label className="form-label" htmlFor="productAvailableCombination">Available Combination</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <input type="text" id="productPacking" name="productPacking" onChange={handleChange} className="form-control" />
                                                        <label className="form-label" htmlFor="productPacking">Packing</label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <input type="text" id="productPackInsert" name="productPackInsert" onChange={handleChange} className="form-control" />
                                                        <label className="form-label" htmlFor="productPackInsert">Pack insert/Leaflet</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <input type="text" id="productTherapeuticUse" name="productTherapeuticUse" onChange={handleChange} className="form-control" />
                                                        <label className="form-label" htmlFor="productTherapeuticUse">Therapeutic use</label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <input type="text" id="productProductionCapacity" name="productProductionCapacity" onChange={handleChange} className="form-control" />
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
                                        {product.productImage && (
                                            <img
                                                src={product.productImage}
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

                    {/* Tab2 content */}
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="mt-3 row">
                            <div className="col-md-8 mb-4">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Category/Add</h5>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <input type="text" id="categoryName" name="categoryName" onChange={handleChange} className="form-control" />
                                                        <label className="form-label" htmlFor="categoryName">Category name</label>
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
                                        <button onClick={handleSubmit2} type="button" className="btn btn-primary btn-lg btn-block mt-3">
                                            Save Category
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* tab content 3 */}
                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
<div className="mt-3">
                    <EditorProvider >
      <Editor value={templatevalue} onChange={onTemplateChange}>
        <Toolbar>
          <BtnUndo/>
          <BtnRedo/>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline/>
          <BtnStrikeThrough/>
          <BtnNumberedList/>
          <BtnBulletList/>
          <BtnLink/>
          <BtnClearFormatting/>
          <HtmlButton/>
          <BtnStyles/>
        </Toolbar>
      </Editor>
    </EditorProvider>
    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
