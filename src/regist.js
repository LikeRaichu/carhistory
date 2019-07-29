import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.scss';
import axios from 'axios'
import serialize from 'form-serialize'

class Regist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carData: []
        }
    }

    onSubmit = () => {
        console.log('on')

        let mycar = document.querySelector('#carform');
        let carData = serialize(mycar, {hash: true} );
        console.log (carData)
        
        axios({
            url: 'http://70.12.50.161:5050/api/Regist',
            method: 'post',
	        data : carData
        })
        .then(carData => {
            console.log(carData)
            console.log('response', JSON.stringify(carData, null, 2))
        })
        .catch(error => {
            console.log('error : ', error);
        });
    }
    
    render() {
        return (
            <div>
                <Form className="signup_form" id='carform'>
                    <h2>Regist mycar</h2>
                    <br />
                    <FormGroup>
                        <Label>Car number</Label>
                        <Input className="h" type="text" placeholder="Car number" name="Carnumber"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Owner</Label>
                        <Input className="h" type="text" placeholder="Owner" name="Owner"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Model</Label>
                        <Input className="h" type="text" placeholder="Model" name="Model"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Manufacturer</Label>
                        <Input className="h" type="text" placeholder="Manufacturer" name="Manufacturer"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Number of accidents</Label>
                        <Input className="h" type="text" placeholder="Number of accidents" name="Numberofaccidents"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Owner changes</Label>
                        <Input className="h" type="text" placeholder="Owner changes" name="Ownerchanges"></Input>
                    </FormGroup>
                    <Button className="btn btn-lg btn-white btn-block" onClick={this.onSubmit} href="/home">Regist</Button>
                </Form>
            </div>
        );
    }
}

export default Regist;