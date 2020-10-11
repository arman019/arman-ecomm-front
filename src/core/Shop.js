  
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Cards from "./Cards";

const Shop = ()=>{
    
return (
    <Layout
        title="Shop Page"
        description="Search and find books of your choice"
        className="container-fluid"
    >
        <div className="row">
            <div className="col-4"> Left Sidebar </div>

            <div className="col-8"> Right </div>       

        </div>


    </Layout>
);

};


export default Shop;