import {React, useState, useEffect} from "react";
import '../style/App.css';
import MyModal from "../components/UI/Modal/MyModal";
import DeleteButton from "../components/UI/Button/Delete/DeleteButton";
import MyButton from "../components/UI/Button/Apply/MyButton";
import MyInput from "../components/UI/Input/MyInput"
import SuccessButton from "../components/UI/Button/Success/SuccessButton";
import RealtyList from "../components/RealtyList";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const RealtyPage = () => {
    const [realtys, setRealtys] = useState([]);
    const [isRealtysLoading, setIsRealtysLoading] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [notification, setNotification] = useState("");
    const [typeOfRealty, setTypeOfRealty] = useState(1);
    const [modalCreateActive, setModalCreateActive] = useState(false);
    const [notModalActive, setNotModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [realtyToEdit, setRealtyToEdit] = useState({});
    const [searchRealty, setSearchRealty] = useState({
      address_city: "",
      address_street: "",
      address_house_number: "",
      address_apartment_number: ""
    });
    const [createRealty, setCreateRealty] = useState({});
    const [delId, setDelId] = useState();
    const [editId, setEditId] = useState();

    useEffect(() => {
      fetchRealtys()
    }, [])

    async function fetchRealtys(){
        setIsRealtysLoading(true);
  
        let body = JSON.stringify({})
        
        const frealtys = await fetch("https://esoft.onrender.com/api/realty/all", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        }).then((response) => {
          return response.json()
        })
        setRealtys(frealtys.data)
        setIsRealtysLoading(false);
    };


    async function filterRealtys(){
  
        let body
        
        if (typeOfRealty){
            body.type_id = typeOfRealty
        }
        
        const filterRealtys = await fetch("https://esoft.onrender.com/api/realty/all", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then((response) => {
          return response.json()
        })
        setRealtys(filterRealtys.data)
      };

    async function deleteRealty(id){
    const result = await fetch('https://esoft.onrender.com/api/realty/delete/' + String(id), {method: 'DELETE'})
        .then((response1) => {
        if (response1 && response1 !== undefined){
            return response1.json();
        }
        })
        console.log(result)
        if (result.msg === "success"){
        const filteredRealtys = realtys.filter((item) => item.id !== id)
        setRealtys(filteredRealtys)
        setNotification("Удалено успешно")
        setNotModalActive(true)
        }
        if (result.message){
            setNotification("Ошибка удаления: " + result.message)
            setNotModalActive(true)
        } 
    };


    async function addRealty(){
    let body = { }
    if (createRealty.address_city){
        body.address_city = createRealty.address_city
    }
    if (createRealty.address_street){
        body.address_street = createRealty.address_street
    }
    if (createRealty.address_house_number){
        body.address_house_number = createRealty.address_house_number
    }
    if (createRealty.address_apartment_number){
        body.address_apartment_number = createRealty.address_apartment_number
    }
    if (createRealty.area){
        body.area = createRealty.area
    }
    if (createRealty.coordinate_latitude){
        body.coordinate_latitude = createRealty.coordinate_latitude
    }
    if (createRealty.coordinate_longitude){
        body.coordinate_longitude = createRealty.coordinate_longitude
    }
    if (createRealty.floor){
        body.floor = createRealty.floor
    }
    if (createRealty.total_rooms){
        body.total_rooms = createRealty.total_rooms
    }
    if (createRealty.total_floors){
        body.total_floors = createRealty.total_floors
    }
    if (createRealty.type_id){
        body.type_id = createRealty.type_id
    }

    
    const createResponse = await fetch('https://esoft.onrender.com/api/realty/create', {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        return response.json()
    })


    if (createResponse && createResponse !== undefined && createResponse.msg == "success"){
        setRealtys([...realtys, createResponse.data])
        setNotification("Недвижимость успешно создана")
        setNotModalActive(true)
    }else{
        if (createResponse.message == "Ошибка при валидации"){
        setNotification("Ошибка: " + createResponse.errors[0].msg)
        setNotModalActive(true)
        }else{
        if(createResponse.message == "Ошибка валидации"){
            setNotification("Ошибка: " + createResponse.errors[0].msg)
            setNotModalActive(true)
        }
        }
    }
    };



    async function editRealty(){
        let body = {}
        if (realtyToEdit.address_city){
            body.address_city = realtyToEdit.address_city
        }
        if (realtyToEdit.address_street){
            body.address_street = realtyToEdit.address_street
        }
        if (realtyToEdit.address_house_number){
            body.address_house_number = realtyToEdit.address_house_number
        }
        if (realtyToEdit.address_apartment_number){
            body.address_apartment_number = realtyToEdit.address_apartment_number
        }
        if (realtyToEdit.area){
            body.area = realtyToEdit.area
        }
        if (realtyToEdit.coordinate_latitude){
            body.coordinate_latitude = realtyToEdit.coordinate_latitude
        }
        if (realtyToEdit.coordinate_longitude){
            body.coordinate_longitude = realtyToEdit.coordinate_longitude
        }
        if (realtyToEdit.floor){
            body.floor = realtyToEdit.floor
        }
        if (realtyToEdit.total_rooms){
            body.total_rooms = realtyToEdit.total_rooms
        }
        if (realtyToEdit.total_floors){
            body.total_floors = realtyToEdit.total_floors
        }
        body.type_id = typeOfRealty
        console.log(body)
        const editedRealty = await fetch("https://esoft.onrender.com/api/realty/update/" + String(editId), {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then((response) => {
          return response.json()
        })
        console.log(editedRealty)
        if (editedRealty.msg === "success"){
          let temp = [...realtys]
          for (let i=0; i < temp.length; i++){
            if (temp[i].id == editId){
              temp[i] = {...realtyToEdit}
              break;
            }
          } 
          setRealtys(temp)
          setNotification("Недвижимость отредактирована")
          setNotModalActive(true)
        }else{
          setNotification(editedRealty.msg)
          setNotModalActive(true)
        }
      };

    async function searchRealtys(){

    const srealtys = await fetch("https://esoft.onrender.com/api/realty/all", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchRealty)
    }).then((response) => {
        return response.json()
    })
    if (srealtys.msg == "success"){
        setRealtys(srealtys.data)
    }
    };

    const handleOutOfSearch = () => {
        setSearchRealty({
            address_city: "",
            address_street: "",
            address_house_number: "",
            address_apartment_number: ""
        })
        fetchRealtys()
    }


    const handleCreate = () => {
        createRealty.type_id = typeOfRealty;
        addRealty();
        document.getElementById("crtForm").reset()
        setCreateRealty({});
        setModalCreateActive(false);
      }

      const handleEdit = () => {
        editRealty();
        setRealtyToEdit({});
        setEditModalActive(false);
      }

      function openModal(id){
        setModalActive(true)
        setDelId(id)
      }


      const exit = (id) => {
        deleteRealty(id)
        setModalActive(false)
      }

      function openEditModal(erealty){
        setEditModalActive(true)
        setEditId(erealty.id)
        setRealtyToEdit(erealty)
        setTypeOfRealty(erealty.type_id)
      }

    return(
        <div className="clients__container">
            <div className="search__container">
                <MyInput
                type="text"
                placeholder="Город"
                value={searchRealty.address_city}
                onChange={e => setSearchRealty({...searchRealty, address_city: e.target.value})}
                />
                <MyInput
                type="text"
                placeholder="Улица"
                value={searchRealty.address_street}
                onChange={e => setSearchRealty({...searchRealty, address_street: e.target.value})}
                />
                <MyInput
                type="text"
                placeholder="Номер дома"
                value={searchRealty.address_house_number}
                onChange={e => setSearchRealty({...searchRealty, address_house_number: e.target.value})}
                />
                <MyInput
                type="text"
                placeholder="Номер квартиры"
                value={searchRealty.address_apartment_number}
                onChange={e => setSearchRealty({...searchRealty, address_apartment_number: e.target.value})}
                />
                <MyButton onClick={()=>searchRealtys()}>Поиск</MyButton>
                <DeleteButton onClick={()=>handleOutOfSearch()}>Сбросить параметры поиска</DeleteButton>
            </div>
            <div className="filter">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Тип недвижимости</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typeOfRealty}
                        label="Age"
                        onChange={e=>{setTypeOfRealty(e.target.value)}}
                        >
                        <MenuItem value={1}>Земля</MenuItem>
                        <MenuItem value={2}>Дом</MenuItem>
                        <MenuItem value={3}>Квартира</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <MyButton onClick={()=>filterRealtys()}>Фильтровать</MyButton>
                <DeleteButton onClick={()=>handleOutOfSearch()}>Сбросить параметры поиска</DeleteButton>
            </div>
            <MyModal active={modalCreateActive} setActive={setModalCreateActive}>
                <div className="createModal">
                    <form id="crtForm" className="createModal">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Тип недвижимости</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={typeOfRealty}
                                label="Age"
                                onChange={e=>{setTypeOfRealty(e.target.value)}}
                                >
                                <MenuItem value={1}>Земля</MenuItem>
                                <MenuItem value={2}>Дом</MenuItem>
                                <MenuItem value={3}>Квартира</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <MyInput type="text" placeholder="Введите город" value={createRealty.address_city||""} onChange={e => setCreateRealty({...createRealty, address_city: e.target.value})}></MyInput>
                        <MyInput type="text" placeholder="Введите улицу" value={createRealty.address_street||""} onChange={e => setCreateRealty({...createRealty, address_street: e.target.value})}></MyInput>
                        <MyInput type="text" placeholder="Введите номер дома" value={createRealty.address_house_number||""} onChange={e => setCreateRealty({...createRealty, address_house_number: e.target.value})}></MyInput>
                        <MyInput type="text" placeholder="Введите номер квартиры" value={createRealty.address_apartment_number||""} onChange={e => setCreateRealty({...createRealty, address_apartment_number: e.target.value})}></MyInput>
                        <MyInput type="number" placeholder="Введите площадь" value={createRealty.area||""} onChange={e => setCreateRealty({...createRealty, area: e.target.value})}></MyInput>
                        <MyInput type="number" placeholder="Введите широту" value={createRealty.coordinate_latitude||""} onChange={e => setCreateRealty({...createRealty, coordinate_latitude: e.target.value})}></MyInput>
                        <MyInput type="number" placeholder="Введите долготу" value={createRealty.coordinate_longitude||""} onChange={e => setCreateRealty({...createRealty, coordinate_longitude: e.target.value})}></MyInput>
                        {typeOfRealty == 2
                            ? <MyInput type="number" placeholder="Этажность дома" value={createRealty.total_floors} onChange={e => setCreateRealty({...createRealty, total_floors: e.target.value})}></MyInput>
                            : typeOfRealty == 3
                                ? <MyInput type="number" placeholder="Этаж" value={createRealty.floor} onChange={e => setCreateRealty({...createRealty, floor: e.target.value})}></MyInput>
                                : <div></div>
                        }
                        {typeOfRealty !== 1
                            ? <MyInput type="number" placeholder="Количество комнат" value={createRealty.total_rooms} onChange={e => setCreateRealty({...createRealty, total_rooms: e.target.value})}></MyInput>
                            : <div></div>
                        }
                    </form>
                    <SuccessButton onClick={()=>handleCreate()}>Создать недвижимость</SuccessButton>
                    <MyButton onClick={()=>setModalCreateActive(false)}>Отмена</MyButton>
                </div>
            </MyModal>
            <MyModal active={editModalActive} setActive={setEditModalActive}>
                <div className="editModal">
                    <form id="edtForm" className="createModal">
                        <MyInput type="text" placeholder="Город" value={realtyToEdit.address_city||""} onChange={e => setRealtyToEdit({...realtyToEdit, address_city: e.target.value})}></MyInput>
                        <MyInput type="text" placeholder="Улица" value={realtyToEdit.address_street||""} onChange={e => setRealtyToEdit({...realtyToEdit, address_street: e.target.value})}></MyInput>
                        <MyInput type="text" placeholder="Номер дома" value={realtyToEdit.address_house_number||""} onChange={e => setRealtyToEdit({...realtyToEdit, address_house_number: e.target.value})}></MyInput>
                        <MyInput type="text" placeholder="Номер квартиры" value={realtyToEdit.address_apartment_number||""} onChange={e => setRealtyToEdit({...realtyToEdit, address_apartment_number: e.target.value})}></MyInput>
                        <MyInput type="number" placeholder="Площадь" value={realtyToEdit.area||""} onChange={e => setRealtyToEdit({...realtyToEdit, area: e.target.value})}></MyInput>
                        <MyInput type="number" placeholder="Широта" value={realtyToEdit.coordinate_latitude||""} onChange={e => setRealtyToEdit({...realtyToEdit, coordinate_latitude: e.target.value})}></MyInput>
                        <MyInput type="number" placeholder="Долготу" value={realtyToEdit.coordinate_longitude||""} onChange={e => setRealtyToEdit({...realtyToEdit, coordinate_longitude: e.target.value})}></MyInput>
                        {typeOfRealty == 2
                            ? <MyInput type="number" placeholder="Этажность дома" value={realtyToEdit.total_floors} onChange={e => setRealtyToEdit({...realtyToEdit, total_floors: e.target.value})}></MyInput>
                            : realtyToEdit.type_id == 3
                                ? <MyInput type="number" placeholder="Этаж" value={realtyToEdit.floor} onChange={e => setRealtyToEdit({...realtyToEdit, floor: e.target.value})}></MyInput>
                                : <div></div>
                        }
                        {typeOfRealty !== 1
                            ? <MyInput type="number" placeholder="Количество комнат" value={realtyToEdit.total_rooms} onChange={e => setRealtyToEdit({...realtyToEdit, total_rooms: e.target.value})}></MyInput>
                            : <div></div>
                        }
                    </form>
                <SuccessButton onClick={()=>handleEdit()}>Редактировать клиента</SuccessButton>
                <MyButton onClick={()=>setEditModalActive(false)}>Отмена</MyButton>
                </div>
          </MyModal>
            <MyModal active={notModalActive} setActive={setNotModalActive}>
                <h2>{notification}</h2>
            </MyModal>
            <MyModal active={modalActive} setActive={setModalActive}>
                <h2 style={{textAlign: "center"}}>Удалить недвижимость?</h2>
                <DeleteButton onClick={()=> exit(delId)}>Delete</DeleteButton>
                <MyButton onClick={()=>setModalActive(false)}>Отмена</MyButton>
            </MyModal>
            <MyButton onClick={()=>setModalCreateActive(true)}>Создать недвижимость</MyButton>
            {isRealtysLoading || !realtys
                ? <h1>Идет загрузка</h1>
                : <RealtyList realtys={realtys??[]} openModal={openModal} openEditModal={openEditModal}/>
            }
        </div>
    );
};

export default RealtyPage;