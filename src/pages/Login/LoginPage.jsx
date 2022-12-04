import LoginForm from "./LoginForm";
import PicturePane from "./PicturePane";

export default function LoginPage() {
  return (
    <div className="loginpage-flex-container">
      <PicturePane />
      <LoginForm />
    </div>
  );
}
