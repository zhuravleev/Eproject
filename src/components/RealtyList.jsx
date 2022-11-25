import React, { useState } from "react";
import RealtyItem from "./RealtyItem";


const RealtyList = ({realtys, openModal, openEditModal}) => {
    return(
        <div className="clients__list">
            {realtys.map((realty) => 
              <RealtyItem realty={realty} openModal={openModal} openEditModal={openEditModal} key={realty.id}/>
            ) }
        </div>
    );
};

export default RealtyList; 
