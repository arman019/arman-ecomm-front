import React ,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout'
import {signin,authenticate} from '../auth/index'

const Signin=()=>{  
    const [values, setValues] = useState({
        email: 'enzo@gm.com',
        password: '123456',
        error: '',
        loading: false,
        redirectToReferrer: false
    });


    const { email, password, loading, error,redirectToReferrer } = values;


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    
    

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({ email, password })
        .then((data)=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,     
                        redirectToReferrer:true
                        });
                });      
            }

        })
    };


const blurChange=(name)=>(event)=>{
   // console.log(event.target.id)

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



    const signInForm = () => (
        <form >

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

    const showLoading = () => (
        loading && (
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading... </p>
        </div>
        )
    );

    const redirectUser=()=>{
        if(redirectToReferrer){
        return <Redirect to="/" />
        }
    }        

    return (
        <Layout
            title="Signin"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        > 
            {showLoading()}
            {showError()}         
            {signInForm()} 
            {redirectUser()}                  
        </Layout>
    );

}


export default Signin;

