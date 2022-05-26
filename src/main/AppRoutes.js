import React from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import CreateUser from '../screens/createUser/CreateUser';



function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<CreateUser/>} path="/"exact/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;