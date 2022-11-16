import React from 'react'
import axios from 'axios'
import profileDefaultImage from '../../images/default.png' //SEUS DIAS ESTÃO CONTADOS

export default class MyFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts : []
        }
    }
    componentDidMount() {
        this.renderPosts()
    }
    componentWillUnmount() {
        clearInterval(this.renderPosts)
    }
    renderPosts() {
        axios.get("/posts/read", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((res) => {
            this.setState({
                posts : res.data.myPosts
            })
        }).catch((error) => (error.message))
    }
    render() {
        const renderedPost = this.state.posts.map((post) => (
            <div key={post._id} className="post fade-in">
                <div className="post-profile-picture">
                    <img width="100" height="100" src={profileDefaultImage} alt="Nome"/>
                </div>
                <div className="post-profile-content"> 
                    <h3>Nome</h3>
                    <p>{post.content}</p>
                </div>
            </div>
        ))
        return (
            <>
                {renderedPost}
            </>
        )
    }
}