import React from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import HomePage from "../screens/HomePage/HomePage";
import CreateUser from '../screens/CreateUser/CreateUser';
import UserProfile from "../screens/UserProfile/UserProfile";
import BraceletCreate from "../screens/BraceletCreate/BraceletCreate";
import ListBracelet from "../screens/ListBracelet/ListBracelet";
import UpdateBracelet from "../screens/UpdateBracelet/UpdateBracelet";
import UpdateUser from "../screens/UpdateUser/UpdateUser";

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
            <Route path={"/updateUser/:id"} exact>
                <UpdateUser />
            </Route>
            <Route path={"/createBracelet"} exact>
                <BraceletCreate />
            </Route>
            <Route path={"/listBracelet"} exact>
                <ListBracelet />
            </Route>
            <Route path={"/updateBracelet/:id"} exact>
                <UpdateBracelet />
            </Route>
        </BrowserRouter>
    );
}

export default AppRoutes;
