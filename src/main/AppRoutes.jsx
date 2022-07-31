import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory, useParams } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import AuthenticatedRoute from './AuthenticatedRoute';
// User
import {
    UserCreate,
    UserUpdate,
    UserLogin,
    UserProfile
} from '../screens/User';
// Bracelet
import {
    BraceletCreate,
    BraceletList,
    BraceletUpdate,
    BraceletDetails
} from '../screens/Bracelet';
// Fence
import {
    FenceBraceletRegister,
    FenceCreate,
    FenceDetails,
    FenceList,
    FenceUpdate
} from "../screens/Fence";

import PaginaNaoEncontrada from "../components/PaginaNaoEncontrada"


function AppRoutes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path={["/home", "/"]} exact>
                    <HomePage/>
                </Route>
                <Route path={["/signIn","/createUser", "/users/create"]} exact >
                    <UserCreate />
                </Route>
                <Route path={"/login"} exact >
                    <UserLogin />
                </Route>
                <AuthenticatedRoute path={["/profile", "/user"]} exact >
                    <UserProfile />
                </AuthenticatedRoute>
                <AuthenticatedRoute path={["/updateUser", "/users/update"]} exact >
                    <UserUpdate />
                </AuthenticatedRoute>

                <AuthenticatedRoute path={["/createBracelet", "/bracelets/create"]} exact >
                    <BraceletCreate />
                </AuthenticatedRoute>
                <AuthenticatedRoute path={["/updateBracelet/:id(\\d+)", "/bracelets/update/:id(\\d+)"]} exact >
                    <BraceletUpdate />
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
                    <FenceUpdate />
                </AuthenticatedRoute>

                <AuthenticatedRoute path={"/fences"} exact >
                    <FenceList />
                </AuthenticatedRoute>

                <AuthenticatedRoute path={"/fences/:id(\\d+)"} exact >
                    <FenceDetails />
                </AuthenticatedRoute>

                <AuthenticatedRoute path={"/fences/:id(\\d+)/bracelets"} exact >
                    <FenceBraceletRegister />
                </AuthenticatedRoute>


                <Route
                    path="/refresh/:page"
                    exact
                >
                    <Refresh/>
                </Route>
                <Route
                    path="**"
                >
                    <PaginaNaoEncontrada/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default AppRoutes;

function Refresh() {
    const history = useHistory();
    const {page} = useParams();

    useEffect(() => {
        history.replace(`/${page}`);
    }, [history, page]);
    return <></>;
}

