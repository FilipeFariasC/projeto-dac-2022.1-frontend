import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from '../screens/HomePage/HomePage';
import AuthenticatedRoute from './AuthenticatedRoute';
// User
import CreateUser from '../screens/User/UserCreate/UserCreate';
import UpdateUser from '../screens/User/UserUpdate/UserUpdate';
import UserLogin from '../screens/User/UserLogin/UserLogin';
import UserProfile from '../screens/User/UserProfile/UserProfile';
// Bracelet
import BraceletCreate from '../screens/Bracelet/BraceletCreate/BraceletCreate';
import BraceletList from '../screens/Bracelet/BraceletList/BraceletList';
import UpdateBracelet from '../screens/Bracelet/BraceletUpdate/BraceletUpdate';
import BraceletDetails from '../screens/Bracelet/BraceletDetails/BraceletDetails';
// Fence
import FenceCreate from '../screens/Fence/FenceCreate/FenceCreate';
import FenceList from "../screens/Fence/FenceList/FenceList"
import UpdateFence from '../screens/Fence/FenceUpdate/FenceUpdate';
import FenceDetails from '../screens/Fence/FenceDetails/FenceDetails';


function AppRoutes(){
    return (
        <BrowserRouter>
            
            <Route path={["/home", "/"]} exact>
                <HomePage/>
            </Route>
            <Route path={["/signIn","/createUser", "/users/create"]} exact >
                <CreateUser />
            </Route>
            <Route path={"/login"} exact >
                <UserLogin />
            </Route>
            <AuthenticatedRoute path={["/profile", "/user"]} exact >
                <UserProfile />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={["/updateUser", "/users/update"]} exact >
                <UpdateUser />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={["/createBracelet", "/bracelets/create"]} exact >
                <BraceletCreate />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={["/updateBracelet/:id(\\d+)", "/bracelets/update/:id(\\d+)"]} exact >
                <UpdateBracelet />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={"/bracelets"} exact >
                <BraceletList />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={"/bracelets/:id(\\d+)"} exact >
                <BraceletDetails />
            </AuthenticatedRoute>


            <AuthenticatedRoute path={["/createFence", "/fences/create"]} exact >
                <FenceCreate />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={["/updateFence/:id(\\d+)", "/fences/update/:id(\\d+)"]} exact >
                <UpdateFence />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/fences"} exact >
                <FenceList />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/fences/:id(\\d+)"} exact >
                <FenceDetails />
            </AuthenticatedRoute>


        </BrowserRouter>
    );
}

export default AppRoutes;
