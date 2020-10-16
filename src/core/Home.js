import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import { getProducts } from './apiCore'
import Cards from './Cards'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { API } from "../config";

import Search from './Search'


const Home = () => {
    const [productBySell, setProductBySell] = useState([])
    const [productByArrival, setProductByArrival] = useState([])
    const [error, setError] = useState(false);

    const loadProductbySell = () => {
        getProducts('sold')
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setProductBySell(data)
                }
            })
            .catch((error) => {
                console.log("dhor Home ", error);
            })
    };


    const loadProductbyArrival = () => {
        getProducts('createdAt')
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setProductByArrival(data)
                }
            })
            .catch((error) => {
                console.log("dhor Home ", error);
            })
    };

    useEffect(() => {
        loadProductbySell()
        loadProductbyArrival()
    }, []);

    const abtImage = ({ item, url }) => {
        return (
            <div className="col-12 col-md-5 m-1 " >
                <Card>

                    <CardImg src={`${API}/${url}/photo/${item._id}`} alt={item.name} width="100%" className="product-img" />
                    <CardBody>
                        <CardTitle><h4>{item.name}</h4></CardTitle>
                        <CardText><p>{item.description}</p></CardText>
                    </CardBody>
                </Card>
            </div>)
    }




    return (
        <Layout
            title="FullStack React Node MongoDB Ecommerce App"
            description="Node React E-commerce App"
            className="container-fluid"
        >
            {/* <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
            {productByArrival.map((product, i) => (
                <Card key={i} product={product} />             
            ))}
        </div>

        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
            {productBySell.map((product, i) => (
                <Card key={i} product={product} />
            ))}
        </div> */}
            <Search />

            <div className="container m-auto">
                <h2 className="mb-4">New Arrivals</h2>
                <div className="row">
                    {productByArrival.map((product, i) => (
                        <Cards key={i} product={product} />
                        //abtImage({item:product,url:"product"})
                    ))}
                </div>
                <hr />

                <h2 className="mb-4">Best Seller</h2>
                <div className="row">
                    {productBySell.map((product, i) => (
                        <Cards key={i} product={product} />
                        //abtImage({item:product,url:"product"})

                    ))}
                </div>
            </div>
        </Layout>
    )

}


export default Home;