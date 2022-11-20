import React from 'react'
import axios from 'axios'
import MyFeed from './MyFeed'
import logo from '../../images/logo.png'
import profileDefaultImage from '../../images/default.png'


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            surname: '',
            profilePic: profileDefaultImage
        }
        this.handleLogout = this.handleLogout.bind(this)
    }
    componentDidMount() {
        this.showProfile()
    }
    showProfile() {
        const authHeader = `Bearer ${localStorage.getItem('jwt')}`
        axios.get("/users/me", {headers: {'Authorization' : authHeader}}).then((res) => {
            this.setState({
                name : res.data.name,
                surname : res.data.surname,
                profilePic: res.data.profilePic
            })
        })
        .catch((error) => {
            console.log(error.message)
        })
    }
    handleLogout() {
        localStorage.removeItem('jwt')
    }
    render() {
        return (
            <>
                <header>
                    <div className="header-left">
                        <img width="50px" height="50px" src={logo} alt="Home"/>
                        <input className="standard-input" type="text" placeholder="Busca"/>
                    </div>
                    <div className="header-right">
                        <a href="/login" onClick={this.handleLogout}>Sair</a>
                        <a href="https://giphy.com/gifs/masterchefbr-help-masterchef-vxdhxk40EKRHpRbeSp" rel="noopener noreferrer" target="_blank">Ajuda</a>
                    </div>
                </header>
                <div className="homepage-flex-container">
                    <div className="profile">
                        <img className="profile-picture" width="200" height="200" src={this.state.profilePic} alt={this.state.nome}/>
                        <h2>{this.state.name}</h2>
                        <h2>{this.state.surname}</h2>
                        <div className="profile-panel">
                        </div>
                    </div>
                    <div className="myfeed">
                        <form className="post-input-box">
                            <p>O que se passa nessa sua cabecinha de merda?</p>
                            <input className="post-input" id="content" name="content" type="text"/>
                            <button className="standard-button" type="submit">Postar</button>
                        </form>
                        <MyFeed />
                    </div>
                </div>
            </>
        )
    }
}