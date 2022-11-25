import {React, useState} from "react";
import DeleteButton from "./UI/Button/Delete/DeleteButton";
import EditButton from "./UI/Button/Warn/EditButton";


const RealtyItem = ({realty, openModal, openEditModal}) => {

    return(
        <div className="client">
            <ul className="client__ul">
                {realty.type_id == 1 ?? realty.type_id !== null
                ? <li><h3>Тип недвижимости:</h3> земля</li>
                : realty.type_id == 2 
                  ? <li><h3>Тип недвижимости:</h3> дом</li>
                  : realty.type_id == 3
                    ? <li><h3>Тип недвижимости:</h3> квартира</li>
                    : <li><h3>Тип недвижимости:</h3> не указан</li>
                }
                {realty.address_city !== null && realty.address_city !== ""
                    ? <li><h3>Город:</h3> {realty.address_city}</li>
                    : <li><h3>Город:</h3> Не указан</li>
                }   
                {realty.address_street !== null && realty.address_street !== ""
                    ? <li><h3>Улица:</h3> {realty.address_street}</li>
                    : <li><h3>Улица:</h3> Не указана</li>
                }
                {realty.address_house_number !== null && realty.address_house_number !== ""
                    ? <li><h3>Номер дома:</h3> {realty.address_house_number}</li>
                    : <li><h3>Номер дома:</h3> Не указан</li>
                }
                {realty.address_apartment_number !== null && realty.address_apartment_number !== ""
                    ? <li><h3>Номер квартиры:</h3> {realty.address_apartment_number}</li>
                    : <li><h3>Номер квартиры:</h3> Не указан</li>
                }    
                {realty.coordinate_latitude !== null && realty.coordinate_latitude !== ""
                    ? <li><h3>Широта:</h3> {realty.coordinate_latitude}</li>
                    : <li><h3>Широта:</h3> Не указана</li>
                }   
                {realty.coordinate_longitude !== null && realty.coordinate_longitude !== ""
                    ? <li><h3>Долгота:</h3> {realty.coordinate_longitude}</li>
                    : <li><h3>Долгота:</h3> Не указана</li>
                }   
                {realty.area !== null && realty.area !== ""
                    ? <li><h3>Площадь:</h3> {realty.area}</li>
                    : <li><h3>Площадь:</h3> Не указана</li>
                }   
                {realty.total_floors !== null && realty.type_id === 2
                    ? <li><h3>Этажность дома:</h3> {realty.total_floors}</li>
                    : realty.floor !== null && realty.type_id === 3
                      ? <li><h3>Этаж:</h3> {realty.floor}</li>
                      : <div></div>
                }   
                {realty.total_rooms !== null && realty.type_id !== 1
                    ? <li><h3>Количество комнат:</h3> {realty.total_rooms}</li>
                    : <div></div>
                }   
            </ul>
            <div className="btn__container">
                <EditButton onClick={()=> openEditModal(realty)}>Edit</EditButton>
                <DeleteButton onClick={()=> openModal(realty.id)}>Delete</DeleteButton>
            </div>
        </div>
    );
};

export default RealtyItem; 