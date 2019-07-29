import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.scss';
import axios from 'axios';
import serialize from 'form-serialize';

class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginData: []
        }
    }

    onSubmit = () => {
        console.log('on')

        let mylogin = document.querySelector('#loginform');
        let loginData = serialize(mylogin, {hash: true} );
        console.log(loginData)
        axios({
            url: 'http://70.12.50.161:5050/api/login',
            method: 'post',
	        data : loginData
        })
        .then(loginData => {
            console.log(loginData)
            console.log('response', JSON.stringify(loginData, null, 2))
        })
        .catch(error => {
            console.log('error : ', error);
        });
    }

    render() {
        return (
                <Form className="login_form" id="loginform">
                <div>
                <h2>Welcome!</h2>
                <br />
                <FormGroup>
                    <Label>Email</Label>
                    <Input className="h" type="email" placeholder="E-mail" name="email"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input className="h" type="password" placeholder="Password" name="password"></Input>
                </FormGroup>
                <Button className="btn btn-lg btn-white btn-block" onClick={this.onSubmit} href="/#/">Login</Button>
                <Button className="btn btn-lg btn-white btn-block" href="/#/SignUp">Sign up</Button>
                </div>
                </Form>
        );
    }
}

export default login;