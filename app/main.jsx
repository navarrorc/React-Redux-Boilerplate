import 'bootstrap/dist/css/bootstrap.css'
import { Grid, Row, Col, PageHeader, Button, Input } from 'react-bootstrap'

import './stylesheets/styles.scss'

import 'es6-promise/auto'
import fetch from 'isomorphic-fetch'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import jsonData from './data/user.json'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                gender: '',
                name: { title: '', first: '', last: '' },
                picture: { thumbnail: '', medium: '', large: '' },
                email: ''
            }
        }
        
    }

    componentDidMount() {
        // fetch('https://randomuser.me/api/?nat=us') // see: https://randomuser.me/
        //     .then(response => response.json())
        //     .then(data => this.setState({ user: data.results[0] }))
        this.setState({ user: jsonData })
    }

    render() {

        let user = this.state.user
        console.log(JSON.stringify(user, null, 4))

        let firstName = user.name.first
        let lastName = user.name.last
        let profilePhoto = user.picture.large

        return (
            <Grid>
                <Row>
                    <Col sm={12} className="profile-pic">
                        <img src={profilePhoto} alt="thumbnail of profile picture" />
                    </Col>
                    <Col sm={12}>
                        <div>Hi, My name is</div>
                        <PageHeader>{firstName} {lastName}</PageHeader>
                    </Col>
                </Row>
            </Grid>
        )

    }

}

ReactDOM.render(<App />, document.getElementById('root'))
