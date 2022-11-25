import {React, useState} from "react";
import DeleteButton from "./UI/Button/Delete/DeleteButton";
import EditButton from "./UI/Button/Warn/EditButton";


const ClientItem = ({client, openModal, openEditModal}) => {

    return(
        <div className="client">
            <ul className="client__ul">
                {client.first_name !== null && client.first_name !== ""
                ? <li><h3>Имя:</h3> {client.first_name}</li>
                : <li><h3>Имя:</h3> Не указано</li> 
                }
                {client.middle_name !== null && client.middle_name !== ""
                    ? <li><h3>Отчество:</h3> {client.middle_name}</li>
                    : <li><h3>Отчество:</h3> Не указано</li> 
                }
                {client.last_name !== null && client.last_name !== ""
                    ? <li><h3>Фамилия:</h3> {client.last_name}</li>
                    : <li><h3>Фамилия:</h3> Не указана</li>
                }
                {client.email !== null && client.email !== ""
                    ? <li><h3>Email:</h3> {client.email}</li>
                    : <li><h3>Email:</h3> Не указан</li>
                }
                {client.phone !== null && client.phone !== ""
                    ? <li><h3>Номер:</h3> {client.phone}</li>
                    : <li><h3>Номер:</h3> Не указан</li>
                }
            </ul>
            <div className="btn__container">
                <EditButton onClick={()=> openEditModal(client)}>Edit</EditButton>
                <DeleteButton onClick={()=> openModal(client.id)}>Delete</DeleteButton>
            </div>
        </div>
    );
};

export default ClientItem; 