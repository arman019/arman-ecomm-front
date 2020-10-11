import React, { useState, useEffect } from "react";

const CheckBox = ({categories}) =>{
    return categories.map((category,i)=>(
        <li key={i} className="list-unstyled">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">{category.name}  </label>         
        </li>
    ));
};

export default CheckBox;