import React from 'react'
import axios from 'axios'
import profileDefaultImage from '../../images/default.png'

export default class GeneralFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                _id: '',
                name: '',
                profilePic: profileDefaultImage,
                content: ''
            }]
        }
    }
    componentDidMount() {
        this.renderPosts()
    }
    renderPosts() {
        const authHeader = `Bearer ${localStorage.getItem('jwt')}`
        axios.get("/queries/generalfeed", {headers: {'Authorization' : authHeader}}).then((res) => {
            this.setState(res)
        }).catch((error) => (error.message))
    }
    render() {
        const renderedPost = this.state.data.map((post) => (
            <div key={post._id} className="post fade-in">
                <div className="post-profile-picture">
                    <img width="100" height="100" src={post.profilePic} alt={post.name}/>
                </div>
                <div className="post-profile-content"> 
                    <h3>{post.name}</h3>
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