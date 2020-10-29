import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Cards from './Cards';
import ShowImage from './ShowImage'
import { Redirect } from "react-router-dom";
import moment from 'moment';
import {addItem} from './cartHelpers'


const Product = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [errors, setError] = useState("");
    const [loading, setLoading] = useState(false); 
    const [redirect, setRedirect] = useState(false);

    const loadSingleProduct = productId => {
        setLoading(true);
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
                setLoading(false);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    console.log(data)
                    if (data.error) {
                        setError(data.error);
                        setLoading(false);
                    } else {
                        setRelatedProduct(data);
                        setLoading(false);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId; //grabbing productId from the react route as a props
        loadSingleProduct(productId);
    }, [props])

    const showLoading = () => (
        loading && (
            <div className="col-12 d-flex justify-content-center  ">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading... </p>
            </div>
        )
    );

    const showErrors = () => (
        errors && (
            <div className="col-12 d-flex justify-content-center">
                <span className="fa fa-spinner fa-pulse fa-4x fa-fw text-primary "></span>
                <p className="mt-3">{`${errors.message}`} </p>
            </div>
        )
    );

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill ml-2 "> In stock </span>
        ) : (<span className="badge badge-primary badge-pill ml-2 "> Out ofstock </span>)
    }


    const addToCart = () => {
        // console.log('added');
        
        addItem(product,()=>setRedirect(true));
    };

  
    const shouldRedirect = (redirect) => {
       
        if (redirect) {
          return <Redirect to="/cart" />;
        }
      };

    const showAll = (product) => {
        return (
            
             <div className= "container ">

                    <div className="col col-md-8 mb-2 mt-4 mr-auto  " >
                        <div className="card" >

                            <div className="card-header d-flex justify-content-center  
                            bg-secondary text-white">
                                {product.name} {showStock(product.quantity)}</div>
                                    {shouldRedirect(redirect)}
                            <div className="card-body offset-2" style={{ height: "70%", width: "70%" }} >
                                <ShowImage item={product} url="product" />
                                <h4 className=" card-text ml-2"> Description: </h4>
                            <p className=" card-text md-col-4 ml-2"> {product.description.substring(0,80)}</p>
                            </div>
                            

                            {/* <div className="row">
                                <div className="col-12 col-md-7 mb-2 mt-4 mr-auto  justify-content-center ">
                                    <div className="card-body " style={{ height: "70%", width: "70%" }} >
                                        <h4 className=" card-text ml-2">Description:</h4>
                                        <p className=" card-text ml-2">{product.description}</p>
                                        <h4 className=" card-text ml-2 ">Price: </h4>
                                        <p className="card-text ml-2 black-9">${product.price}</p>
                                        <h4 className=" card-text ml-2 ">Category: </h4>
                                        <p className="card-text ml-2 black-9">{product.category && product.category.name}</p>
                                        <h4 className=" card-text ml-2 ">Added on: </h4>
                                        <p className="card-text ml-2 black-9">  Added on: {moment(product.createdAt).fromNow()}</p>
                                    </div>
                                </div>
                            </div> */}

                            <div className="row ">

                                <div className=" col col-md  d-flex justify-content-center ">
                                    <button onClick={addToCart} className="btn btn-success mt-2 mb-2 ">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                    <div className="row">                    
                        <div className="card-body " style={{ height: "70%", width: "70%" }} >
                            <h4 className=" card-text ml-2 ">Price: </h4>
                            <p className="card-text ml-2 black-9">${product.price}</p>
                            <h4 className=" card-text ml-2 ">Category: </h4>
                            <p className="card-text ml-2 black-9">{product.category && product.category.name}</p>
                            <h4 className=" card-text ml-2 ">Added on: </h4>
                            <p className="card-text ml-2 black-9">  Added on: {moment(product.createdAt).fromNow()}</p>
                        </div>                  
                </div>                     
            </div>
            </div>                           
        )
    }


    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container"
        >
            <div className= "container">                         
                    <div className="row">
                        {errors && showErrors()}
                        {loading && showLoading()}
                        {product && product.description && showAll(product)}     
                    </div>

                    <h3 className="mt-3">Related products :</h3>
                    <div className = "row">                      
                    {relatedProduct.map((p, i) => (                  
                        <Cards  key={i} product={p} />                                                  
                            ))}
                    </div>     
            </div>       
        </Layout>
    )

};

export default Product;