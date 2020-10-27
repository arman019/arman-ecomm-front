import React, { useState, useEffect } from 'react';
import { Link,Redirect } from 'react-router-dom';
import Layout from './Layout';
import { emptyCart, itemTotal } from './cartHelpers';
import Cards from './Cards';
import { isAuthenticate } from '../auth'
import { getBraintreeClientToken, processPayment } from './apiCore';
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

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    }

    const buy = () => {
        setData({loading:true });
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

                processPayment(userId, token, paymentData)
                .then((response) => {
                        console.log("sucess" ,response)
                        setData({ ...data, success: response.success })
                        

                         emptyCart(() => 
                         {              
                             setData({loading:false ,success: response.success});
                         }            
                         )                 

                    })
                    .catch((error) => {
                        console.log(error)
                        setData({loading:false });
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
                    
                    <DropIn
                        options={{
                            authorization: data.clientToken
                        }}
                        onInstance={instance => (data.instance = instance)} //instance dropIn er builtin system where it shows what is the type of the payment card or paypal
                    />
                
                    <button onClick={buy} className=" btn btn-success btn-block " >
                        Checkout
                    </button>                
                    
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