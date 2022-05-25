import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import CreateUser from '../screens/createUser/CreateUser';



function AppRoutes(){
    return(
        <BrowserRouter>
            <Route component={CreateUser} path="/"exact/>
            
        </BrowserRouter>
    )
}

export default AppRoutes;