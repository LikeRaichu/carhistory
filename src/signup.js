import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.scss';
import axios from 'axios'
import serialize from 'form-serialize'

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: []
        }
    }

    onSubmit = () => {
        console.log('on')

        let myform = document.querySelector('#regform');
        let userData = serialize(myform, {hash: true} );
        console.log (userData)
        axios({
            url: 'http://70.12.50.161:5050/api/SignUp',
            method: 'post',
	        data : userData
        })
        .then(userData => {
            console.log(userData)
            console.log('response', JSON.stringify(userData, null, 2))
        })
        .catch(error => {
            console.log('error : ', error);
        });
    }
    
    render() {
        return (
            <div>
                <Form className="signup_form" id='regform'>
                    <h2>Sign up</h2>
                    <br />
                    <FormGroup>
                        <Label>First name</Label>
                        <Input className="h" type="text" placeholder="First name" name="firstname"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Last name</Label>
                        <Input className="h" type="text" placeholder="Last name" name="lastname"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input className="h" type="email" placeholder="E-mail" name="email"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input className="h" type="password" placeholder="Password" name="password"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password confirm</Label>
                        <Input className="h" type="password" placeholder="Password confirm" name="passwordconf"></Input>
                    </FormGroup>
                    <Button className="btn btn-lg btn-white btn-block" onClick={this.onSubmit} href="/home">Sign up</Button>
                </Form>
            </div>
        );
    }
}

export default SignUp;