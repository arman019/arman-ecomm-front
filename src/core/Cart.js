import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Cards from './Cards';
import Checkout from './Checkout'

const Cart = () => {
    const [items, setItems] = useState([]);

    const [run, setRun] = useState(false);

    useEffect(() => {

        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <>

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
            </>
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
<div className="container  justify-content-border">
        <div className="row " >
            <div className="col col-md-3 ml-2">
                <Checkout products={items} />
            </div>         

            
                <div className="row  mr-2 ">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
            </div>
</div>
        

          



        </Layout>
    );
};

export default Cart;