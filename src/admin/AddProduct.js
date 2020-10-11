import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isAuthenticate} from '../auth'
import { Link } from "react-router-dom";
import { createProduct,getCategories } from "./apiAdmin";

const AddProduct =()=>{

const {user,token}=isAuthenticate();

const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
});



const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
} = values;

const init = () =>{
    getCategories()
    .then((data) =>{
        if(data.error){
            setValues({...values, 
            error:data.error     
            })
        }

        else{
            setValues({...values, 
            categories:data,
            formData:new FormData()  
                });
        }
    })
}

useEffect(() => {
    init();
}, []);


const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
};

const clickSubmit =(event)=>{
    event.preventDefault();
    setValues({...values,error:'',loading:true});

    createProduct(user._id,token,formData)
    .then((data) =>
    {  
        if(data.error){
            setValues({...values, createdProduct:'',error:data.error,loading:false});
        }
        else{
            setValues({...values,name:'',price:'',photo:'',description:'',quantity:'',createdProduct:data.name,loading:false});
        }
    
    }
    )
}     



const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
            <label className="btn btn-secondary">
                <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
            </label>
        </div>

        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
        </div>

        <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea onChange={handleChange('description')} className="form-control" value={description} />
        </div>

        <div className="form-group">
            <label className="text-muted">Price</label>
            <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
        </div>

        <div className="form-group">
            <label className="text-muted">Category</label>
            <select onChange={handleChange('category')} className="form-control">
                <option >Select Category</option>
                {categories && 
                categories.map((category,index)=>
                    <option key={index} value={category._id}>{category.name}</option>
                )}             
            </select>
        </div>

        <div className="form-group">
            <label className="text-muted">Shipping</label>
            <select onChange={handleChange('shipping')} className="form-control">
                <option>Please select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>
        </div>

        <div className="form-group">
            <label className="text-muted">Quantity</label>
            <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
        </div>

        <button className="btn btn-outline-primary">Create Product</button>
    </form>
);

  const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );


    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () => (
        loading && (
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading... </p>
        </div>
        )
    );

    return( 

        <Layout
            title="Add a new Product"
            description={`Hello ${user.name} -- ADMIN--`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}                                   
                {showError()}            
                {showLoading()}
                {newPostForm()}
                </div>
            </div>
        </Layout>
    )

}

export default AddProduct;