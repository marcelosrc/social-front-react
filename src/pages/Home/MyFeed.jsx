import React from 'react'
import axios from 'axios'
import profileDefaultImage from '../../images/default.png'

export default class MyFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts : [],
            profilePic : profileDefaultImage
        }
    }
    componentDidMount() {
        this.renderPosts()
    }
    componentWillUnmount() {
        clearInterval(this.renderPosts)
    }
    renderPosts() {
        const authHeader = `Bearer ${localStorage.getItem('jwt')}`
        const getMe = axios.get("/users/me", {headers: {'Authorization' : authHeader}})
        const getMyPosts = axios.get("/posts/me", {headers: {'Authorization' : authHeader}})
        Promise.all([getMe, getMyPosts]).then((res) => {
            this.setState({
                posts : res[1].data.myPosts,
                info : res[0].data
            })
        }).catch((error) => (error.message))
    }
    render() {
        const renderedPost = this.state.posts.map((post) => (
            <div key={post._id} className="post fade-in">
                <div className="post-profile-picture">
                    <img width="100" height="100" src={this.state.info.profilePic} alt="Nome"/>
                </div>
                <div className="post-profile-content"> 
                    <h3>{this.state.info.name}</h3>
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