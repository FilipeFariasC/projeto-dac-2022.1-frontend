import './App.css';
import NavBar from "./components/Navbar"

import "bootswatch/dist/minty/bootstrap.css";

import AppRoutes from './main/AppRoutes';

function App() {
  return (
    <div> 
        <NavBar/>
        <AppRoutes/>
      </div>
  );
}

export default App;
