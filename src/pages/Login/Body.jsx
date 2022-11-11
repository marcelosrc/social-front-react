import PicturePane from './PicturePane'
import Form from './Form'

export default function Body() {
    return (
        <div className="flex-container">
            <div className="leftside">
                <PicturePane />
            </div>
            <div className="rightside" id="login-pane">
                <Form />
            </div>
        </div>
    )
}