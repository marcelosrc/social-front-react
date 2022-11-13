import {Helmet, HelmetProvider} from 'react-helmet-async'
import {Navigate} from 'react-router-dom'
import Header from './Home/Header'
import Body from './Home/Body'

export default function Home() {
    if (!localStorage.jwt) {
        <Navigate to="/login"/>
    }
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <link rel="stylesheet" href="/styles/home.css" />
                </Helmet>
            </HelmetProvider>
            <Header />
            <Body />
        </>
    )
}