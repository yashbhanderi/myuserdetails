import React, { useContext, useEffect } from "react";
import axios from "axios";

export const AppContext = React.createContext();
const baseURL = " https://myuserdetails-backend.herokuapp.com/api/";

const initialState = {
    isAuth: false,
    token: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGGEDIN":
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
            };
        case "SIGNUP":
            localStorage.setItem("token", JSON.stringify(action.payload));
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
            };
        case "LOGIN":
            localStorage.setItem("token", JSON.stringify(action.payload));
            return {
                ...state,
                isAuth: true,
                token: action.payload,
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuth: false,
                token: null,
            };
        default:
            return state;
    }
};

export const Auth = ({ children }) => {
    const [state, dispatch] = React.useReducer(authReducer, initialState);

    window.addEventListener("load", () => {
        const token = JSON.parse(localStorage.getItem("token") || null);

        if (token) {
            axios
                .post(baseURL + "check-token/", {
                    token: token,
                })
                .then((res) => {
                    dispatch({
                        type: "LOGGEDIN",
                        payload: {
                            token: token,
                        },
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: "LOGOUT",
                    });
                });
        }
    });

    return (
        <>
            <AppContext.Provider
                value={{
                    state,
                    dispatch,
                }}>
                {children}
            </AppContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    return useContext(AppContext);
};

export default Auth;
