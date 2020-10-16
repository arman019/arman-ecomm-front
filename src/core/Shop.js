
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Cards from "./Cards";
import { getCategories, getFilteredProducts } from "./apiCore";
import CheckBox from './CheckBox';
import { prices } from './fixedPrices';
import RadioBox from './RadioBox';


const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResult, setFilteredResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState(0);



    const init = () => {
        setLoading(true)
        getCategories()
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                    setLoading(false)
                }
                else {
                    setCategories(data)
                    setLoading(false)
                }
            })
    };
   

    useEffect(() => {
        init();
        loadFilteredResult(skip, limit, myFilters.filters)
    }, []);





    const handleFilters = (filters, filterBy) => {
        // console.log("Shop",filters, filterBy)

        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        if (filterBy == "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResult(myFilters.filters);
        setMyFilters(newFilters);

    };

    const handlePrice = (value) => {
        const data = prices;
        let testarray = [];

        // testarray.push(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i]._id === parseInt(value)) {
                console.log(data[i].array)
                testarray = (data[i].array);
            }
        }
        return testarray;

        // const data = prices;
        // let array = [];

        // for (let key in data) {
        //     if (data[key]._id === parseInt(value)) {
        //         array = data[key].array;
        //     }
        // }
        // return array;

    }

    const loadFilteredResult = newFilters => {
        setLoading(true);
        getFilteredProducts(skip, limit, newFilters)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setLoading(false);
                }
                else {
                    setFilteredResult(data.data);
                    setSize(data.size);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            })
    };


    const loadMore = () => {
        setLoading(true);
        let toSkip = skip + limit;

        getFilteredProducts(toSkip, limit, myFilters.filters)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                }
                else {
                    setFilteredResult([...filteredResult, ...data.data]);
                    setSize(data.size);
                    setSkip(toSkip);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError(error)
            })
    };

    const loadmoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb -5 btn-lg" >Load More</button>
            )
        )

    }


    const showLoading = () => (
        loading && (
            <div className="col-12 offset-2">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading... </p>
            </div>
        )
    );


    return (
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4 className="m-auto">Filtered By Categories</h4>

                    <ul>
                        <CheckBox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                    </ul>

                    <h4>Filtered By Price </h4>
                    <div>
                      
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                    </div>
                </div>

                <div className="col-8">
                    <span className="fa fa-lg">
                        <i className="fa fa-info"></i>
                        <> Filtered Products : {filteredResult.length}</>
                    </span>
                        {showLoading()}
                    <div className="row">
                       
                        {filteredResult.map((product, i) => (
                            <Cards key={i} product={product} />
                        ))}

                    </div>
                </div>
            </div>
            <div className="row offset-7">

                {loadmoreButton()}
            </div>
        </Layout>
    );

};


export default Shop;