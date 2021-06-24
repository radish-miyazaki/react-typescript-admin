import React from 'react';
import './App.css';
import Dashboard from "./pages/Dashboard";
import {BrowserRouter, Route} from "react-router-dom";
import Users from "./pages/Users/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserCreate from "./pages/Users/UserCreate";
import UserEdit from "./pages/Users/UserEdit";
import Roles from "./pages/Roles/Roles";
import RoleCreate from "./pages/Roles/RoleCreate";
import RoleEdit from "./pages/Roles/RoleEdit";
import Products from "./pages/Products/Products";
import ProductCreate from "./pages/Products/ProductCreate";
import ProductEdit from "./pages/Products/ProductEdit";
import Orders from "./pages/Orders/Orders";
import Profile from "./pages/Profile";

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Dashboard} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" exact component={Profile} />

        <Route path="/users" exact component={Users} />
        <Route path="/users/create" component={UserCreate} />
        <Route path="/users/:id/edit" component={UserEdit} />

        <Route path="/roles" exact component={Roles} />
        <Route path="/roles/create" component={RoleCreate} />
        <Route path="/roles/:id/edit" component={RoleEdit} />

        <Route path="/products" exact component={Products} />
        <Route path="/products/create" component={ProductCreate} />
        <Route path="/products/:id/edit" component={ProductEdit} />

        <Route path="/orders" exact component={Orders} />
      </BrowserRouter>
    </div>
  );
}

export default App;
