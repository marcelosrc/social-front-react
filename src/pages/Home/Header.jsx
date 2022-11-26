import React from 'react'
import logo from '../../images/logo.png'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
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
            </>
        )
    }
}