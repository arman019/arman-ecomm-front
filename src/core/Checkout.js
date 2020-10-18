import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Cards from './Cards';
import {isAuthenticate} from '../auth'

const Checkout = ({products})=>{
    const getTotal =()=>{
        return products.reduce((currentValue,nextValue)=>{
            return currentValue+nextValue.count* nextValue.price;
        },0);
    }

    const showCheckout=()=>
      ( 
        
         isAuthenticate() ? (<button className= "btn btn-success  mr-3" > 
         Checkout 
         </button>):
        (<Link to="/signin">
            <button className= "btn btn-primary  mr-3">  
            Signin to Checkout 
        </button>
            </Link>)
       
    )
    return(
        <div className="row mt-4" >
     
        <h2>Your Total: ${getTotal()}</h2>
        {/* <div className="col">
        {showCheckout()}
        </div> */}
        {showCheckout()}
        
    </div>
    )
};
export default Checkout;