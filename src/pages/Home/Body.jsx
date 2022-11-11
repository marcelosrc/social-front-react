import Profile from './Profile'
import PostInputBox from './PostInputBox'
import Post from './Post'

export default function Body() {
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