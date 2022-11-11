export default function Form() {
    return (
        <form className="rightside-pane fadein">
            <h2>greetings()</h2><br/>
            <p>Email</p>
            <input className="standard-input" id="campo-user" name="email" type="text" aria-label="usuário"/><br/>
            <p>Senha</p>
            <input className="standard-input" id="campo-password" name="password" type="password" aria-label="senha"/>
            <a href="https://giphy.com/gifs/se-fudeu-fodeu-Y4c8GgvNh7BiBbv8fp" target="_blank">
                <p>Esqueci minha senha</p>
            </a>
            <a href="/register">
                <p>Criar conta</p>
            </a>
            <br/>
            <button className="standard-button" type="submit">Login</button>
        </form>
    )
}