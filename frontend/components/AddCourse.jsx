import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../src/config";
import { useNavigate } from "react-router-dom";


export default function AddCourse() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();

    return (
        <>
            <div>
                <input placeholder="Title"
                    onChange={(e) => { setTitle(e.target.value) }}></input>
                <br></br>
                <input placeholder="Description"
                    onChange={(e) => { setDescription(e.target.value) }}></input>
                <br></br>
                <input placeholder="Price"
                    onChange={(e) => { setPrice(e.target.value) }}></input>
                <br></br>
                <input placeholder="Image link"
                    onChange={(e) => { setImageLink(e.target.value) }}></input>
                <br></br>
                <button onClick={async () => {
                    await axios.post(`${BASE_URL}/admin/addCourse`, {
                        title: title,
                        description: description,
                        price: price,
                        imageLink: imageLink
                    }, {
                        headers: {
                            "Authorization": "Bearer" + localStorage.getItem("token")
                        }
                    });
                    alert("Course Added!")
                }}>AddCourse</button>
            </div>
            <br></br>
            <div>
                <button onClick={()=>{navigate('/courses')}}>Courses</button>
            </div>
        </>
    )
}