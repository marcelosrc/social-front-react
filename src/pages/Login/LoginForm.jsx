import React from 'react'
import {Navigate} from 'react-router-dom'
import axios from 'axios'

function greetings() {
    const date = new Date()
    if (date.getHours() >= 19) {
        return "Boa noite"
    } else if (date.getHours() >= 12  && date.getHours() < 19) {
        return "Boa tarde"
    } else {
        return "Bom dia"
    }
}

export default class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isLogged: false
        }
        this.handleChange = this.handleChange.bind(this) 
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault()
        const {email, password} = this.state
        axios.post('/login', {email, password})
            .then((response) => {
                localStorage.setItem('jwt',response.data.jwt)
                this.setState({isLogged: true})
            })
            .catch((error) => {
                alert(error.response.data.message)
            })
    }
    render() {
        return (
            <form className="rightside-pane" onSubmit={this.handleSubmit}>
                <h2>{greetings()}</h2><br/>
                <label>Email</label>
                <input className="standard-input" name="email" type="text" value={this.state.email} onChange={this.handleChange}/><br/>
                <label>Senha</label>
                <input className="standard-input" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                <a href="https://giphy.com/gifs/se-fudeu-fodeu-Y4c8GgvNh7BiBbv8fp" target="_blank" rel="noreferrer">
                    <p>Esqueci minha senha</p>
                </a>
                <a href="/register">
                    <p>Criar conta</p>
                </a>
                <br/>
                <button className="standard-button" type="submit">Login</button>
                {this.state.isLogged && <Navigate to="/"/>}
            </form>
        )
    }
}