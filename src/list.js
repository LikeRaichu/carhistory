import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './list.scss';

class list extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carlist: []
        }
    }

    componentDidMount() {
        axios ({
            url: 'http://70.12.50.161:5050/api/List',
            metdod: 'get'
        })
        .then(response =>{
            console.log('success : ', response);

                let newList = response.data.map(c => {
                return (
                    <tr key={c.carNumber}> 
                        <td>{c.carNumber}</td>
                        <td>{c.owner}</td>
                        <td>{c.model}</td>
                        <td>{c.company}</td>
                        <td>{c.numOfAccident}</td>
                        <td>{c.numOfOwnerChange}</td>
                    </tr>
                )
            })
            this.setState({
                carlist: newList
            })
        })
        .catch(error => {
            console.log('error : ', error);
        });
    }

    render() {
        return (
            
            <div>
                <h1>carlist</h1><br />
            <Table>
                <thead>
                    <tr>
                        <th>차량번호</th>
                        <th>소유자</th>
                        <th>모델</th>
                        <th>제조사</th>
                        <th>사고횟수</th>
                        <th>소유자 변경횟수</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.carlist}    
                </tbody>
            </Table>
            </div>
           
        );
    }
}

export default list;