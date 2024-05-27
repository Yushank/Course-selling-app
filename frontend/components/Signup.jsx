import axios from "axios";
import { useState } from "react"
import { BASE_URL } from "../src/config";
import { useNavigate } from "react-router-dom";




export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div>
            <input placeholder="create username"
            onChange={(e)=>{setUsername(e.target.value)}}></input>
            <br></br>
            <input placeholder="create password"
            onChange={(e)=>{setPassword(e.target.value)}}></input>
            <br></br>
            <button 
            onClick={async()=>{
                const res = await axios.post(`${BASE_URL}/admin/signup`, {
                    username: username,
                    password: password
                },{
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let data = res.data
                localStorage.setItem("token", data.token)

                navigate('/courses');
            }}>SIGNUP</button>
        </div>
    )
}