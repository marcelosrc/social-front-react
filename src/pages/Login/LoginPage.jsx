import Form from './LoginForm'
import PicturePane from './PicturePane'

export default function Login() {
    return (
        <>
            <div className="loginpage-flex-container">
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