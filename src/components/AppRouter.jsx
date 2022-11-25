import React from "react";
import { Route, Routes } from 'react-router-dom';
import AgentPage from "../pages/AgentPage";
import ClientsPage from "../pages/ClientsPage";
import RealtyPage from "../pages/RealtyPage";
import SuggestionPage from "../pages/SuggestionPage";

const AppRouter = () => {

    return(
        <Routes>
          <Route path="/clients" element={<ClientsPage/>}/>
          <Route path="/agents" element={<AgentPage/>}/>
          <Route path="/realtys" element={<RealtyPage/>}/>
          <Route path="/suggestions" element={<SuggestionPage/>}/>
        </Routes>
    );
}

export default AppRouter;