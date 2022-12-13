import LoginForm from "./LoginForm";

export default function LoginPage(props) {
  return (
    <div className="loginpage-flex-container">
      <div className="loginpage-left-pane" />
      <LoginForm setWebtoken={props.setWebtoken} />
    </div>
  );
}
