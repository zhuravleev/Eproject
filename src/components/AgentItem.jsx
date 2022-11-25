import {React, useState} from "react";
import DeleteButton from "./UI/Button/Delete/DeleteButton";
import EditButton from "./UI/Button/Warn/EditButton";


const AgentItem = ({agent, openModal, openEditModal}) => {

    return(
        <div className="client">
            <ul className="client__ul">
                <li><h3>Имя:</h3> {agent.first_name}</li>
                <li><h3>Отчество:</h3> {agent.middle_name}</li>
                <li><h3>Фамилия:</h3> {agent.last_name}</li>
                {agent.deal_share !== null 
                    ? <li><h3>Доля от комиссии:</h3> {agent.deal_share}</li>
                    : <li><h3>Доля от комиссии:</h3> Не указана</li>
                }
            </ul>
            <div className="btn__container">
                <EditButton onClick={()=> openEditModal(agent)}>Edit</EditButton>
                <DeleteButton onClick={()=> openModal(agent.id)}>Delete</DeleteButton>
            </div>
        </div>
    );
};

export default AgentItem; 