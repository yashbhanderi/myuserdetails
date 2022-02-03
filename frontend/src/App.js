import React from "react";
import { Routes, Route } from "react-router";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Dashboard from "./components/dashboard";
import "./css/style.css";

const App = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
        </Routes>
    );
};

export default App;
