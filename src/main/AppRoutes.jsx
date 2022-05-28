import React from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import CreateUser from '../screens/createUser/CreateUser';
import UserProfile from "../screens/UserProfile/UserProfile";
import BraceletCreate from "../screens/BraceletCreate/BraceletCreate";



function AppRoutes(){
    return (
        <BrowserRouter>
            <Route path={"/profile"} exact >
                <UserProfile />
            </Route>
            <Route path={["/","/createUser"]} exact >
                <CreateUser />
            </Route>
            <Route path={"/createBracelet"} exact>
                <BraceletCreate />
            </Route>
        </BrowserRouter>
    );
}

export default AppRoutes;