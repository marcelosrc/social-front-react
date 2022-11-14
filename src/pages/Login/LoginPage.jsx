import {Helmet, HelmetProvider} from 'react-helmet-async'
import Form from './LoginForm'
import PicturePane from './PicturePane'

export default function Login() {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <link rel="stylesheet" href="/styles/login.css" />
                </Helmet>
            </HelmetProvider>
            <div className="flex-container">
                <div className="leftside">
                    <PicturePane />
                </div>
                <div className="rightside" id="login-pane">
                    <Form />
                </div>
            </div>
        </>
    )
}