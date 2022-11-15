import profileDefaultImage from '../../images/default.png' //SEUS DIAS ESTÃO CONTADOS

export default function Post() {
    const nome = 'Nome' //SEUS DIAS ESTÃO CONTADOS
    return (
        <div className="post fade-in">
            <div className="post-profile-picture">
                <img width="100" height="100" src={profileDefaultImage} alt={nome}/>
            </div>
            <div className="post-profile-content"> 
                <h3>Sobrenome</h3>
                <p>Conteúdo</p>
            </div>
        </div>
    )
}