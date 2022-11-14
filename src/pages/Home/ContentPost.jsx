import profileDefaultImage from '../../images/default.png'

export default function Post() {
    return (
        <div className="post fade-in">
            <div className="post-profile-picture">
                <img width="100" height="100" src={profileDefaultImage}/>
            </div>
            <div className="post-profile-content"> 
                <h3>Sobrenome</h3>
                <p>Conteúdo</p>
            </div>
        </div>
    )
}