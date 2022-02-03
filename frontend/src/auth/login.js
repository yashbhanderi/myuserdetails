import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import "../css/auth.css";

const baseURL = "https://myuserdetails-backend.herokuapp.com/api/";

const initialState = {
    username: "",
    password: "",
    error: null,
    loading: false,
};

const Login = () => {
    const { state, dispatch } = useAuthContext();
    const [data, setData] = useState(initialState);

    const handleInputChange = (event) => {
        setData({
            ...data,
            error: null,
            [event.target.name]: event.target.value,
        });
    };

    const loginHandler = (e) => {
        e.preventDefault();

        if (data.email === "" || data.password === "") {
            setData({
                ...data,
                error: "All fields are mandatory !",
            });
            return;
        }

        setData({
            ...data,
            loading: true,
            error: null,
        });

        axios
            .post(baseURL + "login/", {
                username: data.username,
                password: data.password,
            })
            .then((res) => {
                setData({
                    ...data,
                    loading: false,
                    error: null,
                });
                dispatch({
                    type: "LOGIN",
                    payload: res.data,
                });
            })
            .catch((err) => {
                const errorData = err.response ? err.response.data["msg"] : "Network Error, Refresh and try again";
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
                            <span> Login</span>
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
                                            placeholder="Enter your Username"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Password</span>
                                        <input
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            placeholder="Enter your Password"
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
                                        onClick={loginHandler}>
                                        {data.loading ? "Logging in..." : "Log In"}
                                    </button>
                                    <hr />
                                    <Link to="/signup">
                                        <button className="btn" type="button">
                                            Sign Up
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

export default Login;
