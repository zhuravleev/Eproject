import React, { useState } from "react";
import AgentItem from "./AgentItem";


const AgentList = ({agents, openModal, openEditModal}) => {
    return(
        <div className="clients__list">
            {agents.map((agent) => 
              <AgentItem agent={agent} openModal={openModal} openEditModal={openEditModal} key={agent.id}/>
            ) }
        </div>
    );
};

export default AgentList; 