import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read } from './apiCore';
import Cards from './Cards';
import ShowImage from './ShowImage'
import { Link } from "react-router-dom";

const Product = (props) => {

    const [product, setProduct] = useState({});
    const [errors, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loadSingleProduct = (productId) => {
        setLoading(true)
        read(productId)
            .then((resp) => {
                if (resp.error) {
                    setError(resp.error)
                    setLoading(false)
                }
                else {
                    setProduct(resp)
                    setLoading(false)
                }
            }, (error) => {
                console.log("error in Product.js ", error);
                setError(error)
                setLoading(false)
            })
            .catch((error) => {
                console.log("error in Product.js er catch", error);
                setError(error);
                setLoading(false)
            })
    }


    useEffect(() => {
        const productId = props.match.params.productId; //grabbing productId from the react route as a props
        loadSingleProduct(productId);
    }, [])

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

    const showAll = (product) => {
        return (
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col col-md-6 mb-2 mt-4 mr-auto " >
                        <div className="card" >

                            <div className="card-header d-flex justify-content-center  
                            bg-secondary text-white">
                                {product.name}</div>

                            <div className="card-body offset-2" style={{ height: "70%", width: "70%" }} >
                                <ShowImage item={product} url="product" />
                            </div>

                            <div className="row ">
                                <div className=" col-12 d-flex justify-content-center ">
                                    <button className="btn btn-success mt-2 mb-2 ">
                                            Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mb-2 mt-4 mr-auto  justify-content-center ">
                        <div className="card-body " style={{ height: "70%", width: "70%" }} >
                            <h4 className=" card-text ml-2">Description: </h4>
                            <p className=" card-text ml-2">{product.description}</p>
                            <h4 className=" card-text ml-2 ">Price: </h4>
                            <p className="card-text ml-2">${product.price}</p>
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
        >
            {errors && showErrors() }
            {loading && showLoading()}
            { product && product.description && showAll(product)}

        </Layout>
    )

};

export default Product;