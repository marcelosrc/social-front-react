import axios from 'axios'
import React from 'react'

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            surname: '',
            dob: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault()
        const {email, name, surname, dob, password} = this.state
        axios.post("/users/create", {email, name, surname, dob, password})
            .then((res) => {
                localStorage.setItem('jwt',res.data.jwt)
                this.setState({isLogged: true})
            })
            .catch((error) => {
                alert(error.response.data.message)
            })
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="profilePic">Foto</label><br/>
                    <input name="profilePic" type="file" encType="multipart/form-data"/><br/>
                    <label htmlFor="email">Email</label><br/>
                    <input name="email" type="text" value={this.state.email} onChange={this.handleChange}/><br/>
                    <label htmlFor="name">Nome</label><br/>
                    <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/><br/>
                    <label htmlFor="surname">Sobrenome</label><br/>
                    <input name="surname" type="text" value={this.state.surname} onChange={this.handleChange}/><br/>
                    <label htmlFor="dob">Data de Nascimento</label><br/>
                    <input name="dob" type="date" value={this.state.dob} onChange={this.handleChange}/><br/>
                    <label htmlFor="password">Senha</label><br/>
                    <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/><br/>
                    <label htmlFor="pwconf">Confirmação da Senha</label><br/>
                    <input name="pwconf" type="password"/><br/><br/>
                    <button type="submit">Criar</button><br/><br/>
                </form>
                <a href="/login">
                    <button>Voltar</button>
                </a>
            </>
        )
    }
}