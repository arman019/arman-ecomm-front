import React, { useState, useEffect } from "react";
import { getCategories, list } from './apiCore'
import Cards from "./Cards";

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState();


    const {
        categories,
        category,
        search,
        results,
        searched } = data;


    const loadCategories = () => {
        setLoading(true);
        getCategories()
            .then((resp => {

                if (resp.error) {
                    setError(resp.error);
                    console.log(resp.error);
                    setLoading(false);
                }
                else {
                    setData({ ...resp, categories: resp })
                    setLoading(false);
                }
            }), (error) => {
                console.log("yologg ", error);
                setError(error)

                //i was able to catch the error in this section when connection was failed
            })
            .catch((error) => {
                // console.log("dhor ",error);
                console.log("dhor err ", error);
                setError(error)
                setLoading(false);
            })
    };


    const searchData = () => {
        setLoading(true)
        // console.log(search,category);
        if (search) {

            list({ search: search || undefined, category: category })
                .then((resp) => {
                    if (resp.error) {
                        setError(resp.error);
                        // console.log(resp.error);
                        setLoading(false)
                    }
                    else {
                        setData({ ...data, results: resp, searched: true });
                        setLoading(false)
                    }
                })
        }

    }



    const handleChange = (name) => (event) => {
        setData({ ...data, [name]: event.target.value, searched: false });

    }

    const searchedProducts = (results = []) => { //result onek shomoy nao thakte pare tai defalut value faka array

        return (
            <div className="row" >
                {showLoading()}
                {results.map((product, i) => (
                    <Cards key={i} product={product} />
                ))}
            </div>
        )


    }


    const searchSubmit = (event) => {
        event.preventDefault();
        searchData();
    }

    const searchMessage = (results, searched) => {
        if (searched && results.length > 0) {
            return (
                <h2>
                    {`Product available ${results.length}`}
                </h2>
            )

        }
        if (searched && results.length < 1) {
            return (
                <h2>
                    {`No product available product:  ${results.length}`}
                </h2>
            )
        }
    };

    const showLoading = () => (
        loading && (
            <div className="col-12">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading... </p>
            </div>
        )
    );

    const showErrors = () => (
        errors && (
            <div className="col-12 offset-3">
                <span className="fa fa-spinner fa-pulse fa-4x fa-fw text-primary"></span>
                <p>{`${errors.message}`} </p>
            </div>
        )
    );




    const searchForm = () => (

        <div className="row ">
            <div className="col-12 col-md-8 ">
                <form onSubmit={searchSubmit}>
                    <span className="input-group-text ">
                        <div className="input-group input-group-lg ">
                            <div className="input-group-prepend ">
                                <select className="btn mr-2 " onChange={handleChange('category')} >
                                    <option value="All" > ALL </option>
                                    {categories.map((c, i) => (
                                        <option key={i} value={c._id}>
                                            {c.name}
                                        </option>))}
                                </select>
                            </div>
                            <input type="search"
                                className="form-control "
                                onChange={handleChange('search')}
                                placeholder="Search by Name" />
                        </div>

                        <div className="btn input-ground-append ml-2 " style={{ border: 'none' }} >
                            <button className="input-group-text ">
                                Search
                        </button>
                        </div>
                    </span>
                </form>
            </div>
        </div>

    );



    useEffect(() => {
        loadCategories();

    }, []);

    return (

        <div className="row ">
            {showErrors()}
            <div className="col-md-10 container mb-3">
                {searchForm()}
            </div>

            <div className="col-md-10  container mb-3">
                {searchMessage(results, searched)}
                {showLoading()}
            </div>

            <div className="col-md-10 container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    )
};

export default Search;