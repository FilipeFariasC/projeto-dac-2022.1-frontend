import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory, useParams } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import AuthenticatedRoute from './AuthenticatedRoute';
// User
import CreateUser from '../screens/User/UserCreate';
import UpdateUser from '../screens/User/UserUpdate';
import UserLogin from '../screens/User/UserLogin';
import UserProfile from '../screens/User/UserProfile';
// Bracelet
import BraceletCreate from '../screens/Bracelet/BraceletCreate';
import BraceletList from '../screens/Bracelet/BraceletList';
import UpdateBracelet from '../screens/Bracelet/BraceletUpdate';
import BraceletDetails from '../screens/Bracelet/BraceletDetails';
// Fence
import FenceCreate from '../screens/Fence/FenceCreate';
import FenceList from "../screens/Fence/FenceList"
import UpdateFence from '../screens/Fence/FenceUpdate';
import FenceDetails from '../screens/Fence/FenceDetails';
import PaginaNaoEncontrada from "../components/PaginaNaoEncontrada"


function AppRoutes(){
    return (
        <BrowserRouter>
            <Switch>
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

    useEffect(() => history.push(`/${page}`), []);
    return <></>;
}

