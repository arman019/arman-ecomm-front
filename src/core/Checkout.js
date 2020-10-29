import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from './Layout';
import { emptyCart, itemTotal } from './cartHelpers';
import Cards from './Cards';
import { isAuthenticate } from '../auth'
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    let productQuantity = []
    let InBuyproductQuantity = []
    products.map((item) => {
        // console.log("item cont",item.count)
        if (item.quantity <= 0) {
            // console.log("item cont",item.count)
            productQuantity.push(item.name)
        }


        if (item.count > item.quantity) {
            InBuyproductQuantity.push(item.name)
        }
    });

    //console.log("productQuantity ",productQuantity.length)

    const userId = isAuthenticate() && isAuthenticate().user._id;
    const token = isAuthenticate() && isAuthenticate().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    }



    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true });
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then((resp) => {
                //console.log("nonce ", resp)
                nonce = resp.nonce
                // console.log(" after nonce ", resp)
                // console.log("nonce and total of process", nonce, getTotal(products))
                const paymentData = {
                    amount: getTotal(products),
                    paymentMethodNonce: nonce
                };

                products.map((item) => {
                    console.log("item in buy", item.quantity)
                    //productQuantity.push(item.name)
                });

                processPayment(userId, token, paymentData)
                    .then((response) => {
                        console.log("sucess", response)
                        setData({ ...data, success: response.success })

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };




                        createOrder(userId, token, createOrderData)

                        emptyCart(() => {
                            console.log("emptied")
                            setData({ loading: false, success: true });
                        }
                        )




                    })
                    .catch((error) => {
                        console.log(error)
                        setData({ loading: false });
                    })


            })
            .catch((error) => {
                //console.log("dropin error  in catch", error.message)
                setData({ ...data, error: error.message });
            })

    }


    const showCheckout = () =>
        (

            isAuthenticate() ? (
                <div className="col-12 mr-3  d-flex flex-column align-items-end px-3">

                    {showDropIn()}

                </div>

            ) :
                (<Link to="/signin">
                    <button className="btn btn-primary">
                        Signin to Checkout
                    </button>
                </Link>)

        );


    const showDropIn = () => (
        <div className="d-flex flex-column align-items-end px-3 " style={{ width: '250px' }}>
            {data.success}
            {data.clientToken !== null && products.length > 0 ? (
                <div className="row " >
                    {showSuccess(data.success)}

                    <span className=" d-flex flex-stretch text font align-self-center mb-2"
                        style={{ fontFamily: "Times New Roman", fontSize: "25px" }} > Total Item {itemTotal()}</span>

                    <span className=" d-flex flex-stretch text font align-self-center mb-2"
                        style={{ fontFamily: "Times New Roman", fontSize: "25px" }} > Your Total bill: ${getTotal()}</span>

                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>

                    {productQuantity.length > 0 ? (productOutOfstock(productQuantity)) :

                        (<>

                            {InBuyproductQuantity.length > 0 ? (AdditionalproductOutOfstock(InBuyproductQuantity)) :

                                <>
                                    <DropIn
                                        options={{
                                            authorization: data.clientToken
                                        }}
                                        onInstance={instance => (data.instance = instance)} //instance dropIn er builtin system where it shows what is the type of the payment card or paypal
                                    />

                                    <button onClick={buy} className=" btn btn-success btn-block " >
                                        Checkout
                    </button>
                                </>

                            }
                        </>

                        )

                    }

                </div>

            ) : null}
        </div>
    );

    const showSuccess = (success) => (

        success && (<div className="alert alert-primary" >
            Transition Succesfull!
        </div>)
    )


    const showLoading = (loading) => (
        loading && (
            <div className="col-12">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading... </p>
            </div>
        )
    );


    const productOutOfstock = (productQuantity) => {
        console.log("productQuantity ", productQuantity)
        return (
            productQuantity.map((item, i) => (
                <div className="row alert alert-danger" key={i}>
                    <p>The products below are out of stock , remove and try again </p>
                    <div  >
                        {item}
                    </div>

                </div>

            ))
        )
    };


    const AdditionalproductOutOfstock = (InBuyproductQuantity) => {
        console.log("InBuyproductQuantity ", InBuyproductQuantity)
        return (
            InBuyproductQuantity.map((item, i) => (
                <div className="row alert alert-danger" key={i}>
                    <p>The number of product is unavailable in stock , </p>
                    <div  >
                        {item}
                    </div>

                </div>

            ))
        )
    };




    return (
        <>
            <div className="row mt-3" >

                {showLoading(data.loading)}
                {showCheckout()}


            </div>


        </>
    )
};
export default Checkout;