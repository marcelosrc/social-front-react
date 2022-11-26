import axios from 'axios'
import React from 'react'

export default class PostInputBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputPost: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({inputPost: event.target.value})
    }
    handleSubmit(event) {
        const authHeader = `Bearer ${localStorage.getItem('jwt')}`
        event.preventDefault()
        axios.post('/posts/create', {content: this.state.inputPost}, {headers: {'Authorization' : authHeader}}).then((res) => console.log(res)).catch((error) => {alert(error.response.data.message)})
        window.location.reload() //GAMBIARRA
    }
    render() {
        return (
            <>
                <form className="post-input-box" onSubmit={this.handleSubmit}>
                    <p>O que se passa nessa sua cabecinha de merda?</p>
                    <input className="post-input" name="content" type="text" value={this.state.inputPost} onChange={this.handleChange}/>
                    <button className="standard-button" type="submit">Postar</button>
                </form>
            </>
        )
    }
}