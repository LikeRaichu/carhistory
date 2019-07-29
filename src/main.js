import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './home';
import SignUp from './signup';
import Login from './login';
import List from './list';
import Regist from './regist';
import './main.scss'


class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <h1>Carhistory</h1>
                <ul className="header">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/List" className="menu">List</NavLink></li>
                    <li><NavLink to="/Regist" className="menu">Regist</NavLink></li>
                    <li><NavLink to="/SignUp" className="account">SignUp</NavLink></li>
                    <li><NavLink to="/Login" className="account">Login</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home} />
                    <Route path="/List" component={List} />
                    <Route path="/SignUp" component={SignUp} />
                    <Route path="/Login" component={Login} />
                    <Route path="/Regist" component={Regist} />
                </div>
            </div>
            </HashRouter>
        );
    }
}

export default Main;