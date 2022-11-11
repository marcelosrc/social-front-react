import logo from '../../images/logo.png'

export default function Header() {
    return (
        <header>
            <div className="header-left">
                <img width="50px" height="50px" src={logo} alt="Home"/>
                <input className="standard-input" type="text" placeholder="Busca"/>
            </div>
            <div className="header-right">
                <a href="/">Sair</a>
                <a href="https://giphy.com/gifs/masterchefbr-help-masterchef-vxdhxk40EKRHpRbeSp" rel="noopener noreferrer" target="_blank">Ajuda</a>
            </div>
        </header>
    )
}