import React, { useState, useEffect } from "react";

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    }

    return prices.map((price, i) => (
        <div key={i}>
            <input
                type="radio"
                onChange={handleChange}
                className="mr-2 mr-4"
                value={`${price._id}`}
                name={price}

            />
            <label className="form-check-label">{price.name} </label>
        </div>
    ));
};

export default RadioBox;
