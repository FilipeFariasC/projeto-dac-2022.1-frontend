import React from "react";
import {Route, BrowserRouter, Routes, Redirect} from "react-router-dom";
import HomePage from "../screens/HomePage/HomePage";
import CreateUser from '../screens/CreateUser/CreateUser';
import UserProfile from "../screens/UserProfile/UserProfile";
import BraceletCreate from "../screens/BraceletCreate/BraceletCreate";
import FenceCreate from "../screens/FenceCreate/FenceCreate";
import ListBracelet from "../screens/ListBracelet/ListBracelet";
import UpdateBracelet from "../screens/UpdateBracelet/UpdateBracelet";
import UpdateUser from "../screens/UpdateUser/UpdateUser";
import UserLogin from "../screens/UserLogin/UserLogin";
import UpdateFence from "../screens/UpdateFence/UpdateFence";
import AuthenticatedRoute from "./AuthenticatedRoute";
import FenceProfile from "screens/FenceProfile/FenceProfile";
import BraceletProfile from "screens/BraceletProfile/BraceletProfile";
import {isAuthenticated} from "../services/LoginService";

function AppRoutes(){
    return (
        <BrowserRouter>
            
            <Route path={["/home", "/"]} exact>
                <HomePage/>
            </Route>
            
            <Route path={["/signIn","/createUser"]} exact >
                <CreateUser />
            </Route>
            <Route path={"/login"} exact >
                <UserLogin />
            </Route>

            <AuthenticatedRoute path={"/profile"} exact >
                <UserProfile />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/updateUser"} exact >
                <UpdateUser />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/createBracelet"} exact >
                <BraceletCreate />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/updateBracelet/:id"} exact >
                <UpdateBracelet />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/bracelets"} exact >
                <ListBracelet />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/createFence"} exact >
                <FenceCreate />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/updateFence/:id"} exact >
                <UpdateFence />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/fences"} exact >
                <HomePage />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/fenceProfile"} exact >
                <FenceProfile />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/braceletProfile"} exact >
                <BraceletProfile />
            </AuthenticatedRoute>

        </BrowserRouter>
    );
}

export default AppRoutes;
