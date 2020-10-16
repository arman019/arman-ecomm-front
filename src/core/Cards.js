import React from 'react';
import { Link } from "react-router-dom";
import ShowImage from './ShowImage';
import moment from 'moment'

const Cards = ({ product }) => {

const showStock = (quantity)=>{
    return quantity > 0 ?(
        <span className="badge badge-primary badge-pill ml-2"> In stock </span>
    ):(  <span className="badge badge-primary badge-pill d-flex justify-content-center"> Out ofstock </span>)
}

    return (
        <div className="col-12 col-md-4 mb-2 mt-4 " >
            <div className="card" style={{ height: "100%", width: "100%" }}>
                <div className="card-header  bg-secondary text-white d-flex justify-content-center ">{product.name}</div>           
                <div className="card-body " >
                    <ShowImage item={product} url="product" />
                </div>

                <div className="row">
                    <div className="col-12 col-sm ">
                        <h4 className=" d-none d-sm-block card-text ml-2">Description: </h4>
                        <p className="d-none d-sm-block card-text ml-2">{product.description.substring(0, 10)}</p>
                        <h4 className=" card-text ml-2">Price: </h4>
                        <p className=" card-text ml-2 black-9">${product.price}</p>
                        <p className="card-text ml-2 black-8">
                            Category: {product.category && product.category.name }
                        </p>
                        <p className=" card-text ml-2 black-7">
                            Added on: {moment(product.createdAt).fromNow()}
                        </p>
                        {showStock(product.quantity)}  
                       
                    </div>
                </div>
                <div className="row">
                    <div className=" col-12 d-flex justify-content-center">
                        <Link to={`/product/${product._id}`} type="button">
                            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                                View Product
                                </button>
                        </Link>
                        <button className="btn btn-outline-warning mt-2 mb-2">
                            Add to Cart
                            </button>
                    </div>
                </div>
            </div>

        </div>

    )
};

export default Cards;