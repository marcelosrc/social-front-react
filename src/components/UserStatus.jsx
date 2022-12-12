export default function UserStatus(props) {
  return (
    <div className="profile-panel-status">
      <div className="profile-panel-status-desc gray">
        <h3>Seguindo</h3>
        <h3>Seguidores</h3>
        <h3>Posts</h3>
      </div>
      <div className="profile-panel-status-data">
        <h3>{props.user.following}</h3>
        <h3>{props.user.followers}</h3>
        <h3>{props.user.posts}</h3>
      </div>
    </div>
  );
}
