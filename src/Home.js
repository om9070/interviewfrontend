import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar";
const { api } = require("./api")


const Home = () => {
    const [data, setdata] = useState({ name: "", email: "", phone: "", password: "", date: "", status: "pending", gender: "", newpassord: "" })
    const [active, setacive] = useState(true)
    let navigate = useNavigate()

    const handleTextChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target;
        setdata({ ...data, [name]: value })
    }

    const getProfileDetails = async () => {
        try {
            var authToken = localStorage.getItem("token");
            const getProfile = await fetch(
                `${api}cars/all-car`,
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
                console.log(resProfile)
                toast.success(resProfile.message);
                setdata({ ...data, name: resProfile?.data?.name, email: resProfile?.data?.email, phone: resProfile?.data?.phone, date: resProfile?.data?.date, status: resProfile?.data?.status, gender: resProfile?.data?.gender })
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

    const handleStatusChange = async () => {
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

    const handleChange = async () => {
        try {
            var authToken = localStorage.getItem("token");
            const postapi = await fetch(`${api}changepassword`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ newpassord: data?.newpassord, password: data?.password })
            })
            const registerUser = await postapi.json();
            if (registerUser.status === 1) {
                toast.success(registerUser.message);

            } else {
                toast.success("something went wrong");

            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleUserDelete = async () => {
        try {
            var authToken = localStorage.getItem("token");
            const postapi = await fetch(`${api}deleteprofile`, {
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
                localStorage.removeItem("token")
                navigate("/")
            } else {
                toast.success("something went wrong");

            }
        } catch (E) {
            console.log(E)
        }
    }

    const handlChangeProfile = async () => {
        try {
            var authToken = localStorage.getItem("token");
            const updataProfile = await fetch(`${api}updateprofile`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ name: data?.name, email: data?.email, phone: data?.phone, date: data?.date, gender: data.gender })
            })
            const updataProfileData = await updataProfile.json();
            if (updataProfileData.status === 1) {
                toast.success(updataProfileData.message);
                getProfileDetails()
                setacive(true)

            } else {
                toast.success("something went wrong");

            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleclearSession = () => {
        try {
            localStorage.removeItem("token")
            navigate("/")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="d-flex justify-content-evenly ">
                    <img src="/logo512.png" style={{ width: "80px", height: "100px" }} />
                    <h3 className="d-flex align-items-center">bmw</h3>

                </div>
                <div className="d-flex justify-content-evenly ">
                    <img src="/logo512.png" style={{ width: "80px", height: "100px" }} />
                    <h3 className="d-flex align-items-center">bmw</h3>

                </div>
            </div>
        </>
    )
}
export default Home;