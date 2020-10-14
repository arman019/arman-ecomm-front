import React, { useState, useEffect } from "react";
import {getCategories,list} from './apiCore'
import Cards from "./Cards";

const Search = () =>{

    const [data,setData] =useState({
        categories:[],
        category:"",
        search:"",
        results:[],
        searched:false
    });

    const {
        categories,
        category,
        search,
        results,
        searched}=data;


const loadCategories=()=>{

    getCategories()
    .then((data=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            setData({...data,categories:data})
        }
    }))
};


const searchData = () =>{
   // console.log(search,category);
   if(search){
       list({search:search || undefined, category:category})
       .then((resp)=>{
           if(resp.error){
               console.log(resp.error)
           }
           else{
               setData({...data,results:resp,searched:true})
           }
       })
   }
}



const handleChange =(name)=>(event) =>{
    setData({...data,[name]:event.target.value,searched :false });

}


const searchSubmit = (event) =>{
   event.preventDefault();
   searchData();
}


const searchForm = ()=>(

<form onSubmit={searchSubmit}>
        <span className="input-group-text ">
            <div className="input-group input-group-lg ">
                <div className="input-group-prepend ">
                    <select className="btn mr-2 " onChange={handleChange('category')} >
                        <option value="All" > Pick a Category</option>
                            {categories.map((c,i)=>(
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>  ))}
                    </select>
                </div>
                <input type="search" 
                className="form-control col-12 col-md-10" 
                onChange={handleChange('search')}  
                placeholder="Search by Name" />                
            </div>

            <div className="btn input-ground-append ml-2 " style={{border:'none'}} >
                <button className="input-group-text ">
                    Search        
                </button>
            </div>
        </span>
    </form>

);

useEffect(()=>{
    loadCategories();
},[]);

    return(
    <div className="row ">
        <div className="col-md-10 container mb-3">
            {searchForm()}

            {JSON.stringify(results)}
        </div>
    </div>
    )
};

export default Search;