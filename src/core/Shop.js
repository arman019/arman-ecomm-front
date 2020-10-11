  
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Cards from "./Cards";
import { getCategories } from "./apiCore";
import CheckBox from './CheckBox';


const Shop = ()=>{
    const [categories, setCategories]=useState([]);
    const [error, setError]=useState(false);

    const init = () =>{
        getCategories()
        .then((data) =>{
            if(data.error){
            setError(data.error)
            }
    
            else{
                setCategories(data)
            }
        })
    };

    useEffect(()=>{
        init();
    },[]);

    const handleFilters = (filters,filterBy)=>{
        console.log("Shop",filters, filterBy)
    }
    
    
return (
    <Layout
        title="Shop Page"
        description="Search and find books of your choice"
        className="container-fluid"
    >
        <div className="row">
            <div className="col-4">
                <h3>Filtered By Categories</h3>
                <ul>
                <CheckBox categories={categories}  handleFilters={filters=>handleFilters(filters,'category')}/>
                </ul>                
            </div>

            <div className="col-8"> Right </div>       

        </div>


    </Layout>
);

};


export default Shop;