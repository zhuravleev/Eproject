import React from "react";
import classes from "./EditButton.module.css"

const EditButton = ({children, ...props}) => {

    return(
        <button {...props} className= {classes.MyEdt}>
            {children}
        </button>
    );
};

export default EditButton;