import React ,{useState}from 'react';
import { Link,Redirect  } from "react-router-dom";
import ShowImage from './ShowImage';
import moment from 'moment'
import { addItem,updateItem,removeItem } from './cartHelpers';

const Cards = ({ product , 
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate=false,
    showRemoveProductButton = false,
    setRun = f => f, // default value of function
    run = undefined // default value of undefined 
}) => {

const [redirect, setRedirect] = useState(false);
 const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
        showViewProductButton && (     
            <Link  to={`/product/${product._id}`} className="mr-1">
            <button className="btn btn-outline-primary mt-2 ">View Product</button>
            </Link>  
            
        )
        );
    };
    
    const addToCart = () => {
        // console.log('added');
        
        addItem(product,()=>setRedirect(true));
    };

    const shouldRedirect = (redirect) => {
        
        if (redirect) {
        return <Redirect to="/cart" />;
        }
    };

    const showAddToCartBtn = showAddToCartButton => {
    return (
        showAddToCartButton && (
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
            Add to cart
                </button>
            )
            );
    };

const showStock = (quantity)=>{
    return quantity > 0 ?(
        <span className="badge badge-primary badge-pill ml-2"> In stock </span>
    ):(  <span className="badge badge-primary badge-pill d-flex justify-content-center"> Out ofstock </span>)
};

/* ami count product quantity change korar jonno first a productid ke access kortesi then ami oi id te count pathaitesi 'updateItem' 
er maddhome jeta cart er shob prodcutId r sathe amar id check korbe the oi id r count ke invoke kore amar sent kora count ka replace korbe */
const showCartUpdateOptions = cartUpdate => {
        return (
        cartUpdate && (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                    </div>
                    <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                </div>
            </div>
        )
        );
    };

    const handleChange = productId => event => {
       // run useEffect in parent Cart

        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
        updateItem(productId, event.target.value);
        }
      };

      const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
              }}
              className="btn btn-outline-danger mt-2 mb-2"
            >
              Remove Product
            </button>
          )
        );
      };


    return (
    <div className="col-12 col-md-4 mb-2 mt-4 " >
        <div className="card" style={{ height: "100%", width: "100%" }}>
            <div className="card-header  bg-secondary text-white d-flex justify-content-center ">{product.name}</div>           
            
            <div className="card-body " >
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
            </div>

                <div className="row">
                    <div className="col-12 ">
                        <h4 className=" d-none d-sm-block card-text ml-2">Description: </h4>
                        <p className="d-none d-sm-block card-text ml-2">{product.description.substring(0, 10)}</p>
                        <h4 className=" card-text ml-2">Price: </h4>
                        <p className=" card-text ml-2 black-9">${product.price}</p>
                        <p className="card-text ml-2 black-8">
                            Category: {product.category && product.category.name }
                        </p>
                        <p className=" card-text ml-2 black-7">
                            Added on: {moment(product.createdAt).fromNow()}
                        </p>
                        
                        {showStock(product.quantity)}  
                        {showCartUpdateOptions(cartUpdate)}                      
                    </div>
                </div>

                <div className="row">
              
                    <div className=" col-12 d-flex justify-content-center ">
                        {/* <Link to={`/product/${product._id}`} type="button">
                            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                                View Product
                                </button>
                        </Link>
                        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                            Add to Cart
                        </button> */}
                        
                        {showViewButton(showViewProductButton)}
                        {showRemoveButton(showRemoveProductButton)}

                        {showAddToCartBtn(showAddToCartButton)}

                    
                    
                    </div>
                </div>
            </div>

        </div>

    )
};

export default Cards;