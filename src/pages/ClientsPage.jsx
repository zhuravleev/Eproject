import {React, useState, useEffect} from "react";
import '../style/App.css';
import ClientList from "../components/ClientList";
import MyModal from "../components/UI/Modal/MyModal";
import DeleteButton from "../components/UI/Button/Delete/DeleteButton";
import MyButton from "../components/UI/Button/Apply/MyButton";
import MyInput from "../components/UI/Input/MyInput"
import SuccessButton from "../components/UI/Button/Success/SuccessButton";

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [isClientsLoading, setIsClientsLoading] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [notification, setNotification] = useState("");
    const [modalCreateActive, setModalCreateActive] = useState(false);
    const [notModalActive, setNotModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [clientToEdit, setClientToEdit] = useState({ });
    const [searchClient, setSearchClient] = useState({
      first_name: "",
      middle_name: "",
      last_name: ""
    });
    const [createClient, setCreateClient] = useState({
      name: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: ""
    });
    const [delId, setDelId] = useState();
    const [editId, setEditId] = useState();

    useEffect(() => {
      fetchClients()
    }, [])
  
    async function fetchClients(){
      setIsClientsLoading(true);

      let body = JSON.stringify({
        first_name: "",
        middle_name: "",
        last_name: ""
      })
      
      const fclients = await fetch("https://esoft.onrender.com/api/client/all", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        return response.json()
      }).catch((e) => {
        console.log('bad', e)
      })
      setClients(fclients.data)
      setIsClientsLoading(false);
    };

    async function deleteClient(id){
      const result = await fetch('https://esoft.onrender.com/api/client/delete/' + String(id), {method: 'DELETE'})
        .then((response1) => {
          if (response1 && response1 !== undefined){
            return response1.json();
          }
        })
        if (result.msg === "success"){
          const filteredClients = clients.filter((item) => item.id !== id)
          setClients(filteredClients)
          setNotification("Удалено успешно")
          setNotModalActive(true)
        }else{
            setNotification("Ошибка удаления: " + result.message)
            setNotModalActive(true)
        } 
    };


    async function editClient(){
      let body = {}
      if (clientToEdit.email){
        body.email = clientToEdit.email
      }
      if (clientToEdit.phone){
        body.phone = clientToEdit.phone
      }
      if (clientToEdit.first_name){
        body.first_name = clientToEdit.first_name
      }
      if (clientToEdit.middle_name){
        body.middle_name = clientToEdit.middle_name
      }
      if (clientToEdit.last_name){
        body.last_name = clientToEdit.last_name
      }

      const editedClient = await fetch("https://esoft.onrender.com/api/client/update/" + String(editId), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((response) => {
        return response.json()
      })
      if (editedClient.msg === "success"){
        let temp = [...clients]
        for (let i=0; i < temp.length; i++){
          if (temp[i].id == editId){
            temp[i] = {...clientToEdit}
            break;
          }
        } 
        setClients(temp)
        setNotification("Клиент отредактирован")
        setNotModalActive(true)
      }else{
        setNotification(editedClient.msg)
        console.log(editedClient)
        setNotModalActive(true)
      }
    };


    async function addClient(){
      let body

      if (createClient.email  && createClient.phone ){
        body = JSON.stringify({
          first_name: createClient.name,
          middle_name: createClient.middleName,
          last_name: createClient.lastName,
          email: createClient.email,
          phone: createClient.phone
      })}else{
        if (createClient.email !== ""){
          body = JSON.stringify({
            first_name: createClient.name,
            middle_name: createClient.middleName,
            last_name: createClient.lastName,
            email: createClient.email,
          })  
        }else{
          body = JSON.stringify({
            first_name: createClient.name,
            middle_name: createClient.middleName,
            last_name: createClient.lastName,
            phone: createClient.phone
          })
        }}
  

      
      const createResponse = await fetch('https://esoft.onrender.com/api/client/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        return response.json()
      })


      if (createResponse && createResponse !== undefined && createResponse.msg == "success"){
        setClients([...clients, createResponse.data])
        setNotification("Клиент успешно создан")
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

    async function searchClients(){

      const sclients = await fetch("https://esoft.onrender.com/api/client/all", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchClient)
      }).then((response) => {
        return response.json()
      })
      if (sclients.msg == "success"){
        setClients(sclients.data)
      }
    };
  

    const handleCreate = () => {
      addClient();
      setCreateClient({
        name: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: ""
      });
      setModalCreateActive(false);
    }

    const handleEdit = () => {
      editClient();
      setClientToEdit({
        name: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: ""
      });
      setEditModalActive(false);
    }

    const handleOutOfSearch = () => {
      setSearchClient({
        first_name: "",
        middle_name: "",
        last_name: ""
      })
      fetchClients()
    }

    const exit = (id) => {
        deleteClient(id)
        setModalActive(false)
    }

    function openModal(id){
      setModalActive(true)
      setDelId(id)
    }

    function openEditModal(eclient){
      setEditModalActive(true)
      setEditId(eclient.id)
      setClientToEdit(eclient)
      console.log(eclient)
    }


    return(
        <div className="clients__container">
          <div className="search__container">
            <MyInput
              type="text"
              placeholder="Имя"
              value={searchClient.first_name}
              onChange={e => setSearchClient({...searchClient, first_name: e.target.value})}
            />
            <MyInput
              type="text"
              placeholder="Отчество"
              value={searchClient.middle_name}
              onChange={e => setSearchClient({...searchClient, middle_name: e.target.value})}
            />
            <MyInput
              type="text"
              placeholder="Фамилия"
              value={searchClient.last_name}
              onChange={e => setSearchClient({...searchClient, last_name: e.target.value})}
            />
            <MyButton onClick={()=>searchClients()}>Поиск</MyButton>
            <DeleteButton onClick={()=>handleOutOfSearch()}>Сбросить параметры поиска</DeleteButton>
          </div>
          <MyModal active={modalActive} setActive={setModalActive}>
            <h2 style={{textAlign: "center"}}>Удалить клиента?</h2>
            <DeleteButton onClick={()=> exit(delId)}>Delete</DeleteButton>
            <MyButton onClick={()=>setModalActive(false)}>Отмена</MyButton>
          </MyModal>
          <MyModal active={modalCreateActive} setActive={setModalCreateActive}>
            <div className="createModal">
              <MyInput type="text" placeholder="Введите имя" value={createClient.name} onChange={e => setCreateClient({...createClient, name: e.target.value})}></MyInput>
              <MyInput type="text" placeholder="Введите отчество" value={createClient.middleName} onChange={e => setCreateClient({...createClient, middleName: e.target.value})}></MyInput>
              <MyInput type="text" placeholder="Введите фамилию" value={createClient.lastName} onChange={e => setCreateClient({...createClient, lastName: e.target.value})}></MyInput>
              <MyInput type="email" placeholder="Введите почту" value={createClient.email} onChange={e => setCreateClient({...createClient, email: e.target.value})}></MyInput>
              <MyInput type="text" placeholder="Введите номер телефона" value={createClient.phone} onChange={e => setCreateClient({...createClient, phone: e.target.value})}></MyInput>
              <SuccessButton onClick={()=>handleCreate()}>Создать клиента</SuccessButton>
              <MyButton onClick={()=>setModalCreateActive(false)}>Отмена</MyButton>
            </div>
          </MyModal>
          <MyModal active={editModalActive} setActive={setEditModalActive}>
            <div className="editModal">
              <MyInput
                type="text"
                value={clientToEdit.first_name}
                onChange={e => setClientToEdit({...clientToEdit, first_name: e.target.value})}
              />
              <MyInput
                type="text"
                value={clientToEdit.middle_name}
                onChange={e => setClientToEdit({...clientToEdit, middle_name: e.target.value})}
              />
              <MyInput
                type="text"
                value={clientToEdit.last_name}
                onChange={e => setClientToEdit({...clientToEdit, last_name: e.target.value})}
              />
              <MyInput
                type="email"
                value={clientToEdit.email}
                onChange={e => setClientToEdit({...clientToEdit, email: e.target.value})}
              />
              <MyInput
                type="text"
                value={clientToEdit.phone}
                onChange={e => setClientToEdit({...clientToEdit, phone: e.target.value})}
              />
              <SuccessButton onClick={()=>handleEdit()}>Редактировать клиента</SuccessButton>
              <MyButton onClick={()=>setEditModalActive(false)}>Отмена</MyButton>
            </div>
          </MyModal>
          <MyModal active={notModalActive} setActive={setNotModalActive}>
            <h2>{notification}</h2>
          </MyModal>
          <MyButton onClick={()=>setModalCreateActive(true)}>Создать клиента</MyButton>
          {isClientsLoading || !clients
              ? <h1>Идет загрузка</h1>
              : <ClientList clients={clients??[]} openModal={openModal} openEditModal={openEditModal}/>
          }
        </div>
    );
};

export default ClientsPage;