import { useEffect, useState } from "react";
import { BASE_URL } from "../src/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Courses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/courses`);
            console.log('response data: ', res.data)
            setCourses(res.data.courses)
        } catch (error) {
            console.error("Error fetching courses", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <>
            <div>
                <h1>Courses</h1>
                <ul>
                    {courses.map(course => (
                        <li key={course._id}>
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <p>{course.price}</p>
                            <p>{course.imageLink}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <button onClick={()=>{navigate("/addcourse")}}>Add Course</button>
            </div>
        </>
    )
}