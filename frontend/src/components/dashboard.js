import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/auth";

const baseURL = "https://myuserdetails-backend.herokuapp.com/api/";

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const Dashboard = () => {
    const { state, dispatch } = useAuthContext();
    const [details, setDetails] = useState(initialState);

    useEffect(() => {
        if (state.isAuth) {
            setDetails({
                ...details,
                loading: true,
            });
            axios
                .get(baseURL + "get-details/")
                .then((res) => {
                    setDetails({
                        ...details,
                        users: [...res.data.user],
                        loading: false,
                        error: null,
                    });
                })
                .catch(() => {
                    setDetails({
                        ...details,
                        loading: false,
                        error: "Some error occurred, Please refresh the page !",
                    });
                });
        }
    }, [state.isAuth]);

    return (
        <div className="users">
            <div className="header">
                <h1 className="heading">MyAuth.</h1>
                <div>
                    {state.isAuth ? (
                        <button
                            className="btn"
                            type="button"
                            onClick={() =>
                                dispatch({
                                    type: "LOGOUT",
                                })
                            }>
                            Log Out
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn" type="button">
                                    Log In
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn" type="button">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <h1 className="heading" style={{ fontSize: "3.5rem" }}>
                User <span>Details</span>
            </h1>
            {state.isAuth ? (
                details.loading ? (
                    <>
                        <p className="error">Loading...Please Wait</p>
                    </>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.users.map((item, index) => {
                                return (
                                    <tr key={uuidv4()}>
                                        <td>{index + 1}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone_no}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )
            ) : (
                <h1 className="error">Please Login first !</h1>
            )}
        </div>
    );
};

export default Dashboard;
