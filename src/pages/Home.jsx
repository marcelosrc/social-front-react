import {Helmet, HelmetProvider} from 'react-helmet-async'
import CheckAuth from './Login/CheckAuth'
import Header from './Home/Header'
import Body from './Home/Body'

export default function Home() {
    return (
        <>
            <CheckAuth />
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