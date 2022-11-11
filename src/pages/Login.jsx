import {Helmet, HelmetProvider} from 'react-helmet-async'
import Body from './Login/Body'

export default function Login() {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <link rel="stylesheet" href="/styles/login.css" />
                </Helmet>
            </HelmetProvider>
            <Body />
        </>
    )
}