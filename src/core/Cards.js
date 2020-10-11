import React from 'react';
import { Link } from "react-router-dom";
import ShowImage from './ShowImage'

const Cards = ({product}) =>{
    return(
        <div className="col-12 col-md-4 mb-2 mt-4" >
            <div className="card" style={{height:"100%",width:"100%"}}>
                <div className="card-header">{product.name}</div>                  
                <div className="card-body " >                  
                    <ShowImage item={product} url="product" />                                                                                              
                </div>

                        <div className="row">
                            <div className="col-12 col-sm ">
                                <h4 className=" card-text ml-2">Description: </h4>
                                <p className="d-none d-sm-block card-text ml-2">{product.description}</p>
                                <h4 className=" card-text ml-2">Price: </h4>
                                <p className="d-none d-sm-block card-text ml-2">${product.price}</p>  
                            </div>
                        </div>
                       
                    <div className="row">
                        <div className="offset-2">
                            <Link to="/">
                                <button className="btn btn-outline-primary mt-2 mb-2"> 
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