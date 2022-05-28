import React from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import HomePage from "../screens/HomePage/HomePage";
import CreateUser from '../screens/createUser/CreateUser';
import UserProfile from "../screens/UserProfile/UserProfile";
import BraceletCreate from "../screens/BraceletCreate/BraceletCreate";



function AppRoutes(){
    return (
        <BrowserRouter>
            <Route path={["/home", "/"]} exact>
                <HomePage/>
            </Route>
            <Route path={"/profile"} exact >
                <UserProfile />
            </Route>
            <Route path={["/signIn","/createUser"]} exact >
                <CreateUser />
            </Route>
            <Route path={"/createBracelet"} exact>
                <BraceletCreate />
            </Route>
        </BrowserRouter>
    );
}

export default AppRoutes;