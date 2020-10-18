import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Cards from './Cards';


const Cart = () => {
    const [items, setItems] = useState([]);

    const [run, setRun] = useState(false);

    useEffect(() => {
      
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Cards
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        setRun={setRun}
                        run={run}
                        showRemoveProductButton={true}
                            
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
       
            <div className="row">
                <div className="col col-md-8 ">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>            
            </div>
        
        </Layout>
    );
};

export default Cart;