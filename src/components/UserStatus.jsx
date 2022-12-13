export default function UserStatus(props) {
  return (
    <div className="profile-panel-status">
      <p>Seguindo {props.currentUser.following}</p>
      <p>Devotos {props.currentUser.followers}</p>
      <p>Publicações {props.currentUser.posts}</p>
    </div>
  );
}
