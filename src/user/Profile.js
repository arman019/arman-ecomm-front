import React,{useEffect,useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticate} from '../auth'
import { Link } from "react-router-dom";
import  {read , update , updateuser} from './apiUser';

const Profile = (props)=>{
    const [values , setValues] = useState({
        name : "",
        email : "",
        password: "",
        error : false,
        success:false
    });

    const {token} = isAuthenticate()
    const {name,email,password , error , success}= values; 

    const init = (userId)=>{
     //   console.log(userId)
     read(userId,token)
     .then((data)=>{
         if(data.error){
             setValues({...values, error:true})
         }
         else{
             setValues({...values, name:data.name, email:data.email})
         }
     })
    }

    useEffect(()=>{
        init(props.match.params.userId)
    },[]);


    return(

        <Layout
        title="Profile"
        description="user profile"
        className="container" 
        >
            <div className="row ">
                <h2>{JSON.stringify(values)}</h2>
            </div>
        
                
        </Layout>
    
        )
    

};


export default Profile;