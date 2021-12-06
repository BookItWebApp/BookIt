import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { authenticate } from "../../store";

const Login = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.id);
    const auth = useSelector((state) => state.auth);

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;

    //
    function handleChange(event) {
        const { name, value } = event.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    //
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        const formName = event.target.name;
        await dispatch(authenticate(username, password, formName));
    };

    return (
        <div>
            {isLoggedIn ? (
                <Redirect to="/home" />
            ) : (
                <div className="login-page-container">
                    <div>
                        <h3>Sign into your account</h3>
                    </div>
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
                        className="pure-form pure-form-aligned login--form"
                        onSubmit={handleSubmit}
                        name="login"
                    >
                        <div className="pure-control-group">
                            <label htmlFor="username">
                                <small>Username</small>
                            </label>
                            <input
                                name="username"
                                type="text"
                                value={username}
                                onChange={handleChange}
                            />
                            {submitted && !username && (
                                <div className="invalid-feedback">
                                    Username is required
                                </div>
                            )}
                        </div>
                        <br />
                        <div className="pure-control-group">
                            <label htmlFor="password">
                                <small>Password</small>
                            </label>
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleChange}
                            />
                            {submitted && !password && (
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
                                sign in
                            </button>
                        </div>
                    </form>

                    <br />
                    <span>or</span>
                    <br />
                    <br />

                    <Link to="/signup">
                        <button className="button-secondary pure-button">
                            Create a new account
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};
export default Login;
