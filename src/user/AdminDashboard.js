import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticate} from '../auth'
import { Link } from "react-router-dom";

const AdminDashboard = () =>{

const {user:{_id,name,email,role}}=isAuthenticate();

const adminLinks = () => {
    return (
        <div className="col-12 col-md-4 mb-2 mt-4" >
        <div className="card">
            <h4 className="card-header">Admin Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/category">
                        Create Category
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to={"/create/product"}>
                    Create Product
                    </Link>
                </li>
            </ul>
        </div>
        </div>
    );
};

const adminInfo = () => {
    return (
        <div className="col-12 col-md-6 mb-2 mt-4" >
        <div className="card mb-5">
            <h3 className="card-header">Admin Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">
                    {role === 1 ? "Admin" : "Registered User"}
                </li>
            </ul>
        </div>
        </div>
    );
};



    return(

    <Layout
    title="Dashboard"
    description={`hello ${name}`}
   
    >
    <div  className="container" >
        <div className="row ">          
            {adminLinks()}          
            {adminInfo()}
        </div>
    </div>
        
    
            
    </Layout>

    )

}

export default AdminDashboard;