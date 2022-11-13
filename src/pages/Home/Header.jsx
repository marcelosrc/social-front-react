import logo from '../../images/logo.png'
import {Navigate} from 'react-router-dom'

export default function Header() {
    function logout() {
        localStorage.removeItem('jwt')
    }
    return (
        <header>
            <div className="header-left">
                <img width="50px" height="50px" src={logo} alt="Home"/>
                <input className="standard-input" type="text" placeholder="Busca"/>
            </div>
            <div className="header-right">
                <a href="/" onClick={logout}>Sair</a>
                <a href="https://giphy.com/gifs/masterchefbr-help-masterchef-vxdhxk40EKRHpRbeSp" rel="noopener noreferrer" target="_blank">Ajuda</a>
            </div>
        </header>
    )
}