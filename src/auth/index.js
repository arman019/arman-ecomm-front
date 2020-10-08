import {API} from '../config'

export const signup=(user)=>{
    return ( 
        fetch(`${API}/signup`, {
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then((resp)=>{
            return resp.json()
        })
        .catch((err)=>{
            console.log(err);
        })
        
        )
    };


export const signin=(user)=>{
    return ( 
        fetch(`${API}/signin`, {
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then((resp)=>{
            return resp.json()
        })
        .catch((err)=>{
            console.log(err);
        })
        
        )
    };


export const authenticate =(data,next)=>{
    if(typeof window !=='undefined'){
        localStorage.setItem('jwt', JSON.stringify(data)) //setting data at local storage with the key 'jwt'
        next();
    }
};

export const signout = (next) =>{

    if(typeof window !=='undefined'){
        localStorage.removeItem('jwt') //setting data at local storage with the key 'jwt'
        next();

    return fetch(`${API}/signout`, {
            method:"GET",
        })
        .then((resp)=>{
            return resp.json()
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}