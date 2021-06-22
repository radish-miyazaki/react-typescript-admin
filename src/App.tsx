import React from 'react';
import './App.css';
import Dashboard from "./pages/Dashboard";
import {BrowserRouter, Route} from "react-router-dom";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Dashboard} />
        <Route path="/users" component={Users} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default App;
