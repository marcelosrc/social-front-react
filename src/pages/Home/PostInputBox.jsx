import axios from 'axios'
import React from 'react'

export default class PostInputBox extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            inputPost: '',
            error: false
        }
    }
    handleChange(event) {
        this.setState({inputPost: event.target.value})
    }
    handleSubmit(event) {
        const authHeader = `Bearer ${localStorage.getItem('jwt')}`
        event.preventDefault()
        axios.post('/posts/create', {
            content: this.state.inputPost
        }, {
            headers: {'Authorization' : authHeader}
        }).then(() => {
            this.setState({
                error: false,
                inputPost: ''
            })
        }).catch((error) => {
            this.setState({
                error: <small className="red">{error.response.data.message}</small>,
                inputPost: ''
            })
        })
    }
    render() {
        return (
            <>
                <form className="post-input-box" onSubmit={this.handleSubmit}>
                    <label htmlFor="content">O que se passa nessa sua cabecinha de merda?</label>
                    <input className="post-input" name="content" type="text" value={this.state.inputPost} onChange={this.handleChange}/>
                    {this.state.error}
                    <button className="standard-button" type="submit">Postar</button>
                </form>
            </>
        )
    }
}