import React, { useState } from "react";
import ClientItem from "./ClientItem";


const ClientList = ({clients, openModal, openEditModal}) => {
    return(
        <div className="clients__list">
            {clients.map((client) => 
              <ClientItem client={client} openModal={openModal} openEditModal={openEditModal} key={client.id}/>
            ) }
        </div>
    );
};

export default ClientList; 
