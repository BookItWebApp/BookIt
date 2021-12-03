import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { createNewUser } from "../../store/users";
import { register } from "../../store/auth";

function Register() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.id);
    const auth = useSelector((state) => state.auth);
    // console.log("REGISTER AUTH > ", auth);

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [submitted, setSubmitted] = useState(false);

    //
    function handleChange(event) {
        const { name, value } = event.target;
        setUser((user) => ({ ...user, [name]: value }));
    }

    //
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        const formName = event.target.name;
        console.log("REGISTER USER SUBMIT < ", user);

        await dispatch(register(user, formName));
    };

    return (
        <div>
            {isLoggedIn ? (
                <Redirect to="/home" />
            ) : (
                <div className="login-page-container">
                    {auth.error ? (
                        <label className="login-error-label">
                            {auth.error && auth.error.response && (
                                <div> {auth.error.response.data} </div>
                            )}
                        </label>
                    ) : (
                        ""
                    )}
                    <form
                        onSubmit={handleSubmit}
                        className="pure-form pure-form-aligned login--form"
                        name="signup"
                    >
                        <div className="pure-control-group">
                            <label htmlFor="username">
                                <small>Username</small>
                            </label>
                            <input
                                name="username"
                                onChange={handleChange}
                                value={user.username}
                            />
                            {submitted && !user.username && (
                                <div className="invalid-feedback">
                                    Username is required
                                </div>
                            )}
                        </div>
                        <br />
                        <div className="pure-control-group">
                            <label htmlFor="email">
                                <small>Email</small>
                            </label>
                            <input
                                name="email"
                                onChange={handleChange}
                                value={user.email}
                            />
                            {submitted && !user.email && (
                                <div className="invalid-feedback">
                                    Email is required
                                </div>
                            )}
                        </div>
                        <br />
                        <div className="pure-control-group">
                            <label htmlFor="password">
                                <small>Password</small>
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={user.password}
                            />
                            {submitted && !user.password && (
                                <div className="invalid-feedback">
                                    Password is required
                                </div>
                            )}
                        </div>
                        <br />
                        <div className="pure-control-group">
                            <button
                                type="submit"
                                className="button-secondary pure-button"
                            >
                                Create Account
                            </button>
                            <Link to="/login">
                                <button className="button-secondary pure-button">
                                    login
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
export default Register;
