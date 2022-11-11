export default function PostInputBox() {
    return (
        <form className="post-input-box">
            <p>O que se passa nessa sua cabecinha de merda?</p>
            <input className="post-input" id="content" name="content" type="text"/>
            <button className="standard-button" type="submit">Postar</button>
        </form>
    )
}