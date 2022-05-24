import React from "react";
import {Route, BrowserRouter} from "react-router-dom";



function AppRoutes(){
    return(
        <BrowserRouter>
            <Route component={TelaHome} path="/"exact/>
            
        </BrowserRouter>
    )
}

export default AppRoutes;