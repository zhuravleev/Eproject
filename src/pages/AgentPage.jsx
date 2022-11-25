import {React, useState, useEffect} from "react";
import "../style/App.css";
import AgentList from "../components/AgentList";
import MyModal from "../components/UI/Modal/MyModal";
import DeleteButton from "../components/UI/Button/Delete/DeleteButton";
import MyButton from "../components/UI/Button/Apply/MyButton";
import MyInput from "../components/UI/Input/MyInput"
import SuccessButton from "../components/UI/Button/Success/SuccessButton";

const AgentPage = () => {
    const [agents, setAgents] = useState([]);
    const [isAgentsLoading, setIsAgentsLoading] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [notification, setNotification] = useState("");
    const [modalCreateActive, setModalCreateActive] = useState(false);
    const [notModalActive, setNotModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [agentToEdit, setAgentToEdit] = useState({ });
    const [searchAgent, setSearchAgent] = useState({
      first_name: "",
      middle_name: "",
      last_name: ""
    });
    const [createAgent, setCreateAgent] = useState({
      name: "",
      middleName: "",
      lastName: "",
      deal_share: null
    });
    const [delId, setDelId] = useState();
    const [editId, setEditId] = useState();

    useEffect(() => {
      fetchAgents()
    }, [])
  
    async function fetchAgents(){
      setIsAgentsLoading(true);

      let body = JSON.stringify({
        first_name: "",
        middle_name: "",
        last_name: ""
      })
      
      const fagents = await fetch("https://esoft.onrender.com/api/agent/all", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        console.log(response)
        return response.json()
      }).catch((e) => {
        console.log('bad', e)
      })
      setAgents(fagents.data)
      setIsAgentsLoading(false);
    };

    async function deleteAgent(id){
      const result = await fetch('https://esoft.onrender.com/api/agent/delete/' + String(id), {method: 'DELETE'})
        .then((response1) => {
          if (response1 && response1 !== undefined){
            return response1.json();
          }
        })
        if (result.msg === "success"){
          const filteredAgents = agents.filter((item) => item.id !== id)
          setAgents(filteredAgents)
          setNotification("Удалено успешно")
          setNotModalActive(true)
        }else{
            setNotification("Ошибка удаления: " + result.message)
            setNotModalActive(true)
        } 
    };


    async function editAgent(){
      let body = {}

      if (agentToEdit.first_name){
        body.first_name = agentToEdit.first_name
      }
      if (agentToEdit.middle_name){
        body.middle_name = agentToEdit.middle_name
      }
      if (agentToEdit.last_name){
        body.last_name = agentToEdit.last_name
      }
      if (agentToEdit.deal_share){
        body.deal_share = agentToEdit.deal_share
      }

      const editedAgent = await fetch("https://esoft.onrender.com/api/agent/update/" + String(editId), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((response) => {
        return response.json()
      })
      if (editedAgent.msg === "success"){
        let temp = [...agents]
        for (let i=0; i < temp.length; i++){
          if (temp[i].id == editId){
            temp[i] = {...agentToEdit}
            break;
          }
        } 
        setAgents(temp)
        setNotification("Реэлтор отредактирован")
        setNotModalActive(true)
      }else{
        setNotification(editedAgent.msg)
        setNotModalActive(true)
      }
    };


    async function addAgent(){
      let body

      body = JSON.stringify({
        first_name: createAgent.name,
        middle_name: createAgent.middleName,
        last_name: createAgent.lastName,
        deal_share: createAgent.deal_share
      })
  

      
      const createResponse = await fetch('https://esoft.onrender.com/api/agent/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        return response.json()
      })


      if (createResponse && createResponse !== undefined && createResponse.msg == "success"){
        setAgents([...agents, createResponse.data])
        setNotification("Риэлтор успешно создан")
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

    async function searchAgents(){

      const sagents = await fetch("https://esoft.onrender.com/api/agent/all", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchAgent)
      }).then((response) => {
        return response.json()
      })
      if (sagents.msg == "success"){
        setAgents(sagents.data)
      }
    };
  

    const handleCreate = () => {
      addAgent();
      setCreateAgent({
        name: "",
        middleName: "",
        lastName: "",
        deal_share: 0,
      });
      setModalCreateActive(false);
    }

    const handleEdit = () => {
      editAgent();
      setAgentToEdit({
        name: "",
        middleName: "",
        lastName: "",
        deal_share: 0
      });
      setEditModalActive(false);
    }

    const handleOutOfSearch = () => {
      setSearchAgent({
        first_name: "",
        middle_name: "",
        last_name: ""
      })
      fetchAgents()
    }

    const exit = (id) => {
        deleteAgent(id)
        setModalActive(false)
    }

    function openModal(id){
      setModalActive(true)
      setDelId(id)
    }

    function openEditModal(eagent){
      setEditModalActive(true)
      setEditId(eagent.id)
      setAgentToEdit(eagent)
    }
    
    
    return(
        <div className="clients__container">
          <div className="search__container">
            <MyInput
              type="text"
              placeholder="Имя"
              value={searchAgent.first_name}
              onChange={e => setSearchAgent({...searchAgent, first_name: e.target.value})}
            />
            <MyInput
              type="text"
              placeholder="Отчество"
              value={searchAgent.middle_name}
              onChange={e => setSearchAgent({...searchAgent, middle_name: e.target.value})}
            />
            <MyInput
              type="text"
              placeholder="Фамилия"
              value={searchAgent.last_name}
              onChange={e => setSearchAgent({...searchAgent, last_name: e.target.value})}
            />
            <MyButton onClick={()=>searchAgents()}>Поиск</MyButton>
            <DeleteButton onClick={()=>handleOutOfSearch()}>Сбросить параметры поиска</DeleteButton>
          </div>
          <MyModal active={modalActive} setActive={setModalActive}>
            <h2 style={{textAlign: "center"}}>Удалить риэлтора?</h2>
            <DeleteButton onClick={()=> exit(delId)}>Delete</DeleteButton>
            <MyButton onClick={()=>setModalActive(false)}>Отмена</MyButton>
          </MyModal>
          <MyModal active={modalCreateActive} setActive={setModalCreateActive}>
            <div className="createModal">
              <MyInput type="text" placeholder="Введите имя" value={createAgent.name} onChange={e => setCreateAgent({...createAgent, name: e.target.value})} required></MyInput>
              <MyInput type="text" placeholder="Введите отчество" value={createAgent.middleName} onChange={e => setCreateAgent({...createAgent, middleName: e.target.value})} required></MyInput>
              <MyInput type="text" placeholder="Введите фамилию" value={createAgent.lastName} onChange={e => setCreateAgent({...createAgent, lastName: e.target.value})} required></MyInput>
              <MyInput type="number" placeholder="Введите долю от комиссии" value={createAgent.deal_share} onChange={e => setCreateAgent({...createAgent, deal_share: e.target.value})}></MyInput>
              <SuccessButton type="submit" onClick={()=>handleCreate()}>Создать риэлтора</SuccessButton>
              <MyButton onClick={()=>setModalCreateActive(false)}>Отмена</MyButton>
            </div>
          </MyModal>
          <MyModal active={editModalActive} setActive={setEditModalActive}>
            <div className="editModal">
              <MyInput
                type="text"
                value={agentToEdit.first_name}
                onChange={e => setAgentToEdit({...agentToEdit, first_name: e.target.value})}
              />
              <MyInput
                type="text"
                value={agentToEdit.middle_name}
                onChange={e => setAgentToEdit({...agentToEdit, middle_name: e.target.value})}
              />
              <MyInput
                type="text"
                value={agentToEdit.last_name}
                onChange={e => setAgentToEdit({...agentToEdit, last_name: e.target.value})}
              />
              <MyInput
                type="number"
                value={agentToEdit.deal_share}
                onChange={e => setAgentToEdit({...agentToEdit, deal_share: e.target.value})}
              />
              <SuccessButton onClick={()=>handleEdit()}>Редактировать риэлтора</SuccessButton>
              <MyButton onClick={()=>setEditModalActive(false)}>Отмена</MyButton>
            </div>
          </MyModal>
          <MyModal active={notModalActive} setActive={setNotModalActive}>
            <h2>{notification}</h2>
          </MyModal>
          <MyButton onClick={()=>setModalCreateActive(true)}>Создать риэлтора</MyButton>
          {isAgentsLoading || !agents
              ? <h1>Идет загрузка</h1>
              : <AgentList agents={agents??[]} openModal={openModal} openEditModal={openEditModal}/>
          }
        </div>
    );
};

export default AgentPage; 