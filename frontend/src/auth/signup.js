import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import "../css/auth.css";

const baseURL = "https://myuserdetails-backend.herokuapp.com/api/";

let initialState = {
    username: "",
    email: "",
    phone_no: "",
    password1: "",
    password2: "",
    loading: false,
    error: null,
};

const Signup = () => {
    const { state, dispatch } = useAuthContext();
    const [data, setData] = useState(initialState);

    const handleInputChange = (event) => {
        setData({
            ...data,
            error: null,
            [event.target.name]: event.target.value,
        });
    };

    const signupHandler = (e) => {
        e.preventDefault();

        if (
            data.username === "" ||
            data.email === "" ||
            data.phone_no === "" ||
            data.password1 === "" ||
            data.password2 === ""
        ) {
            setData({
                ...data,
                error: "All fields are mandatory !",
            });
            return;
        }

        let num = /^\d+$/.test(data.phone_no);
        if (!(data.phone_no.length === 10 && num)) {
            setData({
                ...data,
                error: "Phone number should be 10 digit and contains only 0-9",
            });
            return;
        }

        if (
            !(
                data.password1.length > 7 &&
                data.password1.match(/\d/) &&
                data.password1.match(/[a-z]/i)
            )
        ) {
            setData({
                ...data,
                error: "Password length at least 8 and contain at least one alphabet and one number!",
            });
            return;
        }

        if (data.password1 !== data.password2) {
            setData({
                ...data,
                error: "Password Does not match !",
            });
            return;
        }

        setData({
            ...data,
            loading: true,
            error: null,
        });

        axios
            .post(baseURL + "signup/", {
                username: data.username,
                email: data.email,
                phone_no: data.phone_no,
                password: data.password1,
            })
            .then((res) => {
                setData({
                    ...data,
                    loading: false,
                    error: null,
                });
                dispatch({
                    type: "SIGNUP",
                    payload: res.data,
                });
            })
            .catch((err) => {
                const errorData = err.response
                    ? err.response.data["msg"]
                    : "Network Error, Refresh and try again";
                setData({
                    ...data,
                    loading: false,
                    error: errorData,
                });
            });
    };

    return (
        <div className="container">
            <div className="auth">
                {state.isAuth ? (
                    <Navigate to="/" />
                ) : (
                    <>
                        <h1 className="heading">
                            <span>Sign Up</span>
                        </h1>
                        {data.error && (
                            <p className="error" style={{ fontSize: "1.4rem" }}>
                                {data.error}
                            </p>
                        )}
                        <div className="content">
                            <form action="#">
                                <div className="auth-details">
                                    <div className="input-box">
                                        <span className="details">Username</span>
                                        <input
                                            type="text"
                                            name="username"
                                            value={data.username}
                                            placeholder="Enter your Email"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Email</span>
                                        <input
                                            type="text"
                                            name="email"
                                            value={data.email}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Phone Number</span>
                                        <input
                                            type="text"
                                            name="phone_no"
                                            value={data.phone_no}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Password</span>
                                        <input
                                            type="password"
                                            name="password1"
                                            value={data.password1}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Password (Again)</span>
                                        <input
                                            type="password"
                                            name="password2"
                                            value={data.password2}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="input-box">
                                    <button
                                        type="button"
                                        className="btn"
                                        style={{width: "100%"}}
                                        onClick={signupHandler}>
                                        {data.loading ? "Signing in..." : "Sign Up"}
                                    </button>
                                    <hr />
                                    <Link to="/login">
                                        <button className="btn" type="button">
                                            Log In
                                        </button>
                                    </Link>
                                    &nbsp;
                                    <Link to="/">
                                        <button className="btn" type="button">
                                            Home
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Signup;
