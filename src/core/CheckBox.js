import React, { useState, useEffect } from "react";

const CheckBox = ({categories}) =>{
    const [checked, setChecked] = useState([]);

    const handleToggle = c => ()=>{
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];

        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c);
        }
        else{
            newCheckedCategoryId.splice(currentCategoryId,1);
        }

        console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId);
    }

    return categories.map((category,i)=>(
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(category._id)} type="checkbox" className="form-check-input" value={checked.indexOf(category._id === -1)} />
            <label className="form-check-label">{category.name}  </label>         
        </li>
    ));
};

export default CheckBox;