export default function UserStatus(props) {
  return (
    <div className="profile-panel-status">
      <p>Seguindo {props.user.following}</p>
      <p>Devotos {props.user.followers}</p>
      <p>Publicações {props.user.posts}</p>
    </div>
  );
}
