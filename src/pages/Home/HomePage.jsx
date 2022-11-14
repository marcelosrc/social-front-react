import {Helmet, HelmetProvider} from 'react-helmet-async'
import React from 'react'
import CheckAuth from '../Login/CheckAuth'
import ContentPost from './ContentPost'
import logo from '../../images/logo.png'
import profileDefaultImage from '../../images/default.png'
import axios from 'axios'

export default function Home() {

    function logout() {
        localStorage.removeItem('jwt')
    }

    const [profile, setProfile] = React.useState(null)
    React.useEffect(() => {
        axios.get("/users/me", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then((res) => {
            setProfile(res.data)
        })
    }, [])
    if (!profile) return null
    

    return (
        <>
            <CheckAuth />
            <HelmetProvider>
                <Helmet>
                    <link rel="stylesheet" href="/styles/home.css" />
                </Helmet>
            </HelmetProvider>
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
            <div className="flex-container">
                <div className="profile">
                    <img id="profile-picture" width="200" height="200" src={profileDefaultImage} alt="Nome"/>
                    <h2 id="profile-name">{profile.me.name}</h2>
                    <h2 id="profile-surname">{profile.me.surname}</h2>
                    <div className="profile-panel">
                    </div>
                </div>
                <div className="myfeed">
                    <form className="post-input-box">
                        <p>O que se passa nessa sua cabecinha de merda?</p>
                        <input className="post-input" id="content" name="content" type="text"/>
                        <button className="standard-button" type="submit">Postar</button>
                    </form>
                    <ContentPost />
                </div>
            </div>
        </>
    )
}