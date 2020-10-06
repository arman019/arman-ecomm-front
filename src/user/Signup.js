import React ,{useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout'
import {API} from '../config';
import {signup} from '../auth/index'

const Signup=()=>{  
    const [values, setValues] = useState({
        name:'',
        email: '',
        password: '',
        error: '',
        success: false
    });


    const { name, email, password, success, error } = values;


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    
    

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values,error:false})
        signup({ name, email, password })
        .then((data)=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                
                setValues({...values,     
                name:'',
                email: '',
                password: '',
                error: '',
                success: true})
            }

        })
    };


const blurChange=(name)=>(event)=>{
   // console.log(event.target.id)
    if(event.target.id ==="name" && event.target.value ===''){
        //console.log(event.target.id)
        setValues({...values,error:event.target.id +' required ',success:false})
        showError();
    }  

    if( event.target.id ==="email" && event.target.value ===''){
        //console.log(event.target.id)
        setValues({...values,error:event.target.id +' required ',success:false})
        showError();
    }  
    if( event.target.id ==="password" && event.target.value ===''){
        //console.log(event.target.id)
        setValues({...values,error:event.target.id +' required ',success:false})
        showError();
    }  



}




    const signUpForm = () => (
        <form >
            <div className="form-group " >
                <label className="text-muted">Name</label>
                <input id="name" onChange={handleChange('name')} onBlur={blurChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input id="email" onChange={handleChange('email')} type="email" onBlur={blurChange('email')} className="form-control" value={email} />
            </div>

            <div className="form-group ">
                <label className="text-muted">Password</label>
                <input id="password" onChange={handleChange('password')} type="password"  onBlur={blurChange('password')} className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary ">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger col-md-3" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info col-md-3" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        > 
            {showSuccess()}
            {showError()}         
            {signUpForm()}                   
        </Layout>
    );

}


export default Signup;

