import React from "react";
import { useNavigate } from "react-router-dom"


export default function Landing() {
    const navigate = useNavigate();
   return <div>
        <h1>LearnX</h1>
        <p>learn for the future</p>
        <button onClick={()=>navigate('/signin')
        }>SIGNIN</button>
        <button onClick={()=>navigate('/signup')
        }>SIGNUP</button>
    </div>
}