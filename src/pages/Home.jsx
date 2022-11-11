import {Helmet, HelmetProvider} from 'react-helmet-async'
import Header from './Home/Header'
import Body from './Home/Body'

export default function Home() {
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