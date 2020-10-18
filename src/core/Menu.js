import React from 'react';
import {Link ,withRouter} from 'react-router-dom';
import {signout, isAuthenticate}from '../auth/index';
import { itemTotal } from './cartHelpers';


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};


const Menu = ({history})=>{
    
    return(  
        <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    SHOP
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history,"/cart")}
                    to="/cart"
                >
                    CART {""}
                    <sup className="cart-badge">{itemTotal()}</sup>
                </Link>
            </li>

            

        {isAuthenticate() && isAuthenticate().user.role === 1 && (
            
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history,"/admin/dashboard")}
                    to="/admin/dashboard"
                >
                    
                    DASHBOARD
                </Link>
            </li>
        )} 

        {isAuthenticate() && isAuthenticate().user.role === 0 && (
            
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history,"/user/dashboard")}
                    to="/user/dashboard"
                >
                    
                    DASHBOARD
                </Link>
            </li>
        )} 

   

        {!isAuthenticate() && (

        <>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/signin")}
                    to="/signin"
                >
                    SIGNIN
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup"
                >
                    SIGNUP
                </Link>
            </li>

        </>
        )}

            {isAuthenticate() &&(
                <>
                <li className="nav-item">
                <span
                    className="nav-link"
                    style={{cursor:'pointer', color:'#ffffff'}}
                    onClick={()=>{

                        signout(()=>{
                            history.push('/')
                        })
                    }}
                >
                    SIGNOUT
                </span>
            </li>
                </>
            )}

            </ul>
        </div>
        )
    }
    


export default withRouter(Menu);