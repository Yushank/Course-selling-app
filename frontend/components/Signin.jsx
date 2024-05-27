import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../src/config"
import { useNavigate } from "react-router-dom"



export default function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    return (
        <div>
            <input placeholder="username"
            onChange={(e)=>{setUsername(e.target.value)}}></input>
            <br></br>
            <input placeholder="password"
            onChange={(e)=>{setPassword(e.target.value)}}></input>
            <br></br>
            <button
            onClick={async()=>{
                const res = await axios.post(`${BASE_URL}/admin/signin`, {
                    username: username,
                    password: password
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = res.data
                localStorage.setItem("token", data.token);
                
                navigate('/courses');
            }}>SIGNIN</button>
        </div>
    )
}