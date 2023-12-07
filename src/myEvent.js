import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { json, useNavigate } from "react-router-dom"
import { imagefrombuffer } from "imagefrombuffer"; //first import 
import Navbar from "./Navbar";
const { api } = require("./api")



const Mycar = () => {
    const [data, setdata] = useState({ title: "", description: "", date: "",status:"",id:"" })
    const [task, setTask] = useState([])
    const [active, setacive] = useState(false)
    let navigate = useNavigate()

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value })
    }


    const getProfileDetails = async () => {
        try {
            var authToken = localStorage.getItem("token");
            const getProfile = await fetch(
                `${api}event/getEvent`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            const resProfile = await getProfile.json();
            if (resProfile.status == 1) {
                // toast.success(resProfile.message);
                setTask([...resProfile.data])
            } else {
                toast.error("something went wrongs")
            }
        } catch (e) {
            toast.error("something went wrongs")
            console.log(e)
        }
    }

    useEffect(() => {
        getProfileDetails()
    }, [])

    const handleStatusChange = async (e) => {
        try {
            var authToken = localStorage.getItem("token");


            const getStatus = await fetch(
                `${api}getstatusupdate?status=${data.status}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            const resStatus = await getStatus.json();
            if (resStatus.status == 1) {
                toast.success(resStatus.message);
                getProfileDetails()
            } else {
                toast.error("something went wrongs")
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = async (e) => {
        try {
            e.preventDefault();
            // Create form data objectname, color, seat_number
            
            var authToken = localStorage.getItem("token");
            const postapi = await fetch(`${api}event/createEvent`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({title: data?.title, description: data?.description, date: data?.date })
            })
            const registerUser = await postapi.json();
            if (registerUser.status === 1) {
                toast.success(registerUser.message);
                setdata({ title: "", description: "", date: "" })
                getProfileDetails()
            } else {
                toast.success("something went wrong");

            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleEventDelete = async (_id) => {
        try {
            var authToken = localStorage.getItem("token");
            const postapi = await fetch(`${api}event/deleteEvent?_id=${_id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            })
            const deleteuser = await postapi.json();
            if (deleteuser.status === 1) {
                toast.success(deleteuser.message);
                getProfileDetails()

                // localStorage.removeItem("token")
                // navigate("/")
            } else {
                toast.success("something went wrong");

            }
        } catch (E) {
            console.log(E)
        }
    }

    const handleUpdate = async () => {
        try {
            var authToken = localStorage.getItem("token");
            const updataProfile = await fetch(`${api}event/updateEvent?_id=${data.id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({title:data.title,describe:data.description,status:data.status,date:data.date  })
            })
            const updataProfileData = await updataProfile.json();
            if (updataProfileData.status === 1) {
                toast.success(updataProfileData.message);
                getProfileDetails()
                setacive(false)
                setdata({ title: "", description: "", date: "" })

            } else {
                toast.success("something went wrong");

            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleEventUpdate = (e) => {
        setacive(true)
        setdata({ ...data, title:e.title,description:e.description,status:e.status,date:e.date.split("T")[0] ,id:e._id})
    }

    return (
        <>
            <Navbar />

            <div className="row m-5  container">
                <div className="row col-md-10">
                    <div className="col-md-3">
                        <input type="text" placeholder="enter your title" name="title" value={data.title} onChange={(e) => handleTextChange(e)} />
                    </div>
                    <div className="col-md-3">
                        <textarea type="text" placeholder="enter your description" name="description" value={data.description} onChange={(e) => handleTextChange(e)} />
                    </div>
                    <div className="col-md-3">
                        <input type="date" name="date" value={data.date}  onChange={(e) => handleTextChange(e)} />
                    </div>
                    <div className="col-md-3">
                    {
                        active?
                        <select
                        id="dropdown"
                        name="status"
                        value={data.status}
                        onChange={(e) => handleTextChange(e)}
                        >
                                <option value="pending">pending</option>
                                <option value="completed">completed </option>
                            </select>:""
                     }
                     </div>
                </div>
                <div className="col-md-2">
                    {
                       ! active?
                        <button className="btn btn-info" onClick={handleChange}>add event</button>:
                        <button className="btn btn-info" onClick={handleUpdate}>update event</button>
                    }
                </div>
            </div>

            <div className="container my-4">


            <div className="d-flex flex-row justify-content-evenly  align-items-center card">
                                    <table class="table">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">title</th>
                                                <th scope="col">description</th>
                                                <th scope="col">status</th>
                                                <th scope="col">date</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                            {
                                                task.map((e) => {
                                                    return (
                                                        <>
                                                        <tr>
                                                            <th scope="row">1</th>
                                                            <td>{e?.title}</td>
                                                            <td>{e?.description}</td>
                                                            <td>{e?.status}</td>
                                                            <td>{e?.date}</td>
                                                            <button type="button" class="btn btn-info" onClick={()=>handleEventDelete(e._id)}>Delete</button>
                                                            <button type="button" class="btn btn-info" onClick={()=>handleEventUpdate(e)}>update</button>
                                                        </tr> 
                                                         </>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                            </table>
                                </div>
            </div>
        </>
    )
}
export default Mycar;