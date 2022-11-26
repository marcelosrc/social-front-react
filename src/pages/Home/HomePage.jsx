import React from 'react'
import axios from 'axios'
import Header from './Header'
import GeneralFeed from './GeneralFeed'
import PostInputBox from './PostInputBox'
import profileDefaultImage from '../../images/default.png'


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            surname: '',
            profilePic: profileDefaultImage
        }
    }
    componentDidMount() {
        this.showProfile()
    }
    showProfile() {
        const authHeader = `Bearer ${localStorage.getItem('jwt')}`
        axios.get("/users/read/637c2f4cc14ee7cb1a990f21", {headers: {'Authorization' : authHeader}}).then((res) => {
            this.setState(res.data)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }
    render() {
        return (
            <>
                <Header />
                <div className="homepage-flex-container">
                    <div className="profile">
                        <img className="profile-picture" width="200" height="200" src={this.state.profilePic} alt={this.state.name}/>
                        <h2>{this.state.name}</h2>
                        <h2>{this.state.surname}</h2>
                        <div className="profile-panel">
                            
                        </div>
                    </div>
                    <div className="generalfeed">
                        <PostInputBox />
                        <GeneralFeed />
                    </div>
                    <div className="nadaaindapai">

                    </div>
                </div>
            </>
        )
    }
}