import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticate } from '../auth'
import { Link } from "react-router-dom";
import { listOrders, getStatusValue,updateOrderStatus } from "./apiAdmin";
import moment from 'moment'


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticate();
    // console.log("user name ", user.name)

    const loadOrders = () => {
        listOrders(user._id, token)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    //console.log("data ",data)
                    setOrders(data)
                }
            })

    }

    const loadStatusValue = () => {
        getStatusValue(user._id, token)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    console.log("status values ", data)
                    setStatusValues(data)
                }
            })

    }




    useEffect(() => {
        loadOrders()
        loadStatusValue()
    }, [])


    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text" style={{ width: "200px" }}>{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const showOrdersLength = orders => {
        if (orders.length > 0) {
            return (
                <h1 className="text-danger display-2">Total order : {orders.length}  </h1>
            )
        }
        else {
            return (
                <h1 className="text-danger display-2">No Orders </h1>
            )
        }

    };

    const handleStatusChange=(e,orderId)=>{
        updateOrderStatus(user._id,token,orderId,e.target.value)
        .then((data)=>{
            if(data.error){
                console.log("error in handleStatusChange" ,data.error)
            }
            else{
                //setStatusValues(data) // i dont need to setStatus because its already updating in the backend
                loadOrders()
            }
        })
    }

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );
    return (

        <Layout
            title="Orders"
            description={`Hello ${user.name}, you can manage all the orders`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength(orders)}
                    {orders.map((o, oIndex) => {
                        return (
                            <div
                                className="mt-5"
                                key={oIndex}
                                style={{ borderBottom: "5px solid indigo", fontFamily: "Times New Roman", fontSize: "25px" }}

                            >
                                <h2 className="mb-5">
                                    <span style={{ background: " #92a8d1" }}>
                                        Order ID: {o._id}
                                    </span>
                                </h2>

                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                         {showStatus(o)} 
                                    </li>
                                    <li className="list-group-item">
                                        Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{" "}
                                        {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic" style={{ background: "#C1CDC1" }}>
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h3>

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}

                            </div>
                        )
                    })}

                </div>
            </div>
        </Layout>
    )




}




export default Orders;