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
    }