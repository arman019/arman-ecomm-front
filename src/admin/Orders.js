import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isAuthenticate} from '../auth'
import { Link } from "react-router-dom";
import { listOrders } from "./apiAdmin";


const Orders = ()=>{
    const [orders, setOrders]= useState([])

    const {user,token} = isAuthenticate()

    const loadOrders =()=>{ 
        listOrders(user._id, token)
        .then((data)=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log("data ",data)
                setOrders(data)
            }
        })

    }


    useEffect(()=>{
        loadOrders()
    },[])


    const noOrders = orders =>{
        return orders.length < 1 ? <h4>No order</h4> : null 

    };

    return( 

        <Layout
            title="Orders"
            description={`Hello ${user.name}, you can manage all the orders`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                {noOrders(orders)}
                    {JSON.stringify(orders)}
                </div>
            </div>
        </Layout>
    )




}




export default Orders;