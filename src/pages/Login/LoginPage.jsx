import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import PicturePane from "./PicturePane";

export default function LoginPage(props) {
  return (
    <div className="loginpage-flex-container">
      <PicturePane />
      <LoginForm setWebtoken={props.setWebtoken} />
      <Link to="/register">
        <small>Criar nova conta</small>
      </Link>
      <br />
    </div>
  );
}
