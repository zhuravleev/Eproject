import React from "react";
import classes from "./SuccessButton.module.css";

const SuccessButton = ({children, ...props}) => {

    return(
        <button {...props} className= {classes.MyScs}>
            {children}
        </button>
    );
};

export default SuccessButton;