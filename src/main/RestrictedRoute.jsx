import { Redirect, Route } from 'react-router';


const RestrictedRoute = ({children, show, path, redirectTo}) => {
    let to = "/refresh/login";
    if(redirectTo) {
        to = redirectTo;
    }
    console.log(children);

    if(!show) {
        return <Redirect to={to}/>
    }
    return (
        <Route exact={true} path={path} >
            {children}
        </Route>
    )
}
export default RestrictedRoute;
