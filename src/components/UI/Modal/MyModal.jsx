import React from "react";
import "./MyModal.css"


const MyModal = ({active, setActive, children}) => {
    return(
        <div className={active ? "MyMdl active" : "MyMdl"} onClick={() => setActive(false)}>
            <div className={active ? "MyMdl__content active" : "MyMdl__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal; 