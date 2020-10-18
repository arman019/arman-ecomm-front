import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Cards from './Cards';

const Checkout = ({products})=>{
    return(
        <div>
            {JSON.stringify(products)}
        </div>
    )
};
export default Checkout;