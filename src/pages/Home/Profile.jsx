import profileDefaultImage from '../../images/default.png';

export default function Profile() {
    return (
        <div className="profile">
            <img id="profile-picture" width="200" height="200" src={profileDefaultImage} alt="Foto de Perfil"/>
            <h2 id="profile-name">Nome</h2>
            <h2 id="profile-surname">Sobrenome</h2>
            <div className="profile-panel">

            </div>
        </div>
    )
}