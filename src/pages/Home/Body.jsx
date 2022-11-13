import Profile from './Profile'
import PostInputBox from './PostInputBox'
import Post from './Post'
import axios from 'axios'

export default function Body() {
    axios.get("/users/read", {headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}})
        .then((response) => console.log(response.data))
    return (
        <div className="flex-container">
                <Profile />
            <div className="myfeed">
                <PostInputBox />
                <Post />
            </div>
        </div>
    )
}