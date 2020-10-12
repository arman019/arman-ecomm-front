  
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Cards from "./Cards";
import { getCategories } from "./apiCore";
import CheckBox from './CheckBox';
import {prices} from './fixedPrices';
import RadioBox from './RadioBox'


const Shop = ()=>{
    const [myFilters, setMyFilters]=useState({
        filters:{
            category:[],
            price:[]
        }
    }); 
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
       // console.log("Shop",filters, filterBy)
    const newFilters = {...myFilters};
    newFilters.filters[filterBy] = filters;
        if(filterBy == "price"){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }

    setMyFilters(newFilters);
    };
    
    const handlePrice = (value) =>{
        const data = prices;
        let testarray = [];
    
          // testarray.push(data);
        for(let i =0 ;  i< data.length ; i++ ){
            if(data[i]._id === parseInt( value)){
                console.log(data[i].array)
                testarray.push(data[i].array);
            }
        }
    return testarray;        
    }
    
return (
    <Layout
        title="Shop Page"
        description="Search and find books of your choice"
        className="container-fluid"
    >
        <div className="row">
            <div className="col-4">
                <h4>Filtered By Categories</h4>
                <ul>
                <CheckBox categories={categories}  handleFilters={filters=>handleFilters(filters,'category')}/>
                </ul>  

                <h4>Filtered By Price </h4>
                <div>
                    <RadioBox prices={prices}  handleFilters={filters=>handleFilters(filters,'price')}/>
                </div>                
            </div>

            <div className="col-8">
                {JSON.stringify(myFilters)} 
            </div>       

        </div>


    </Layout>
);

};


export default Shop;