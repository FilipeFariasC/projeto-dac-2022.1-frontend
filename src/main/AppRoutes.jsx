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
// Fence
import FenceCreate from '../screens/Fence/FenceCreate/FenceCreate';
import FenceList from "../screens/Fence/FenceList/FenceList"
import UpdateFence from '../screens/Fence/FenceUpdate/FenceUpdate';

function AppRoutes(){
    return (
        <BrowserRouter>
            
            <Route path={["/home", "/"]} exact>
                <HomePage/>
            </Route>
            <Route path={["/signIn","/createUser", "/user/create"]} exact >
                <CreateUser />
            </Route>
            <Route path={"/login"} exact >
                <UserLogin />
            </Route>
            <AuthenticatedRoute path={"/profile"} exact >
                <UserProfile />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={["/updateUser", "/user/update"]} exact >
                <UpdateUser />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={["/createBracelet", "/bracelets/create"]} exact >
                <BraceletCreate />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={["/updateBracelet/:id", "/bracelets/update/:id"]} exact >
                <UpdateBracelet />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={"/bracelets"} exact >
                <BraceletList />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={"/bracelet/:id"} exact >
                <HomePage />
            </AuthenticatedRoute>


            <AuthenticatedRoute path={["/createFence", "/fences/create"]} exact >
                <FenceCreate />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={["/updateFence/:id", "/fences/update/:id"]} exact >
                <UpdateFence />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/fences"} exact >
                <FenceList />
            </AuthenticatedRoute>

            <AuthenticatedRoute path={"/fence/:id"} exact >
                <HomePage />
            </AuthenticatedRoute>

        </BrowserRouter>
    );
}

export default AppRoutes;
