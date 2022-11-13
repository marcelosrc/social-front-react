import {Navigate} from "react-router-dom"

export default function CheckAuth() {
    const validJWT = localStorage.getItem('jwt')
    if (!validJWT) {
        return <Navigate to="/login"/>
    }
}