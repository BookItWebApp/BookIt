import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { authenticate } from "../../store";

const Login = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.id);
    const auth = useSelector((state) => state.auth);
    const history = useHistory();

    function clickToRegister() {
        history.push("/signup");
    }

    // SETTING FORM VALIDATION RULES
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // GET FUNCTIONS TO BUILD FORM WITH USEFORM() HOOK
    const { register, handleSubmit, setError, reset, formState } =
        useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const onSubmit = async ({ username, password }) => {
        try {
            const formName = "login";
            await dispatch(authenticate(username, password, formName));
        } catch (error) {
            console.log("CATCH ON_SUBMIT LOGIN ERR > ", error);
            setError("inputError", { message: error });
        }
    };

    return (
        <div className="signup-login--container">
            {isLoggedIn ? (
                <Redirect to="/home" />
            ) : (
                <div className="signup-login--form">
                    <div className="signup-login-header--form">
                        <h2>Login</h2>
                        <hr></hr>
                    </div>

                    <div className="signup-login-body--form">
                        <form onSubmit={handleSubmit(onSubmit)} name="signup">
                            <div className="form-group align-items-center">
                                <div className="form-group row">
                                    <label className="col-form-label">
                                        Username
                                    </label>
                                    <input
                                        name="username"
                                        type="text"
                                        {...register("username")} // REGISTER YOUR INPUT INTO THE HOOK BY INVOKING THE "REGISTER" FUNCTION
                                        className={`form-control ${
                                            errors.username ? "is-invalid" : ""
                                        } `}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.username?.message}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-form-label">
                                        Password
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        {...register("password")}
                                        className={`form-control ${
                                            errors.password ? "is-invalid" : ""
                                        }`}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.password?.message}
                                    </div>
                                </div>

                                {auth.error ? (
                                    <div className="login-error-label">
                                        {auth.error && auth.error.response && (
                                            <span className="signup-login-error-response">
                                                {" "}
                                                {auth.error.response.data}{" "}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="form-group register--reset-btns">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting && (
                                            <span className="spinner-border spinner-border-sm mr-1"></span>
                                        )}
                                        Login
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => reset()}
                                        className="btn btn-warning float-right"
                                    >
                                        Reset
                                    </button>
                                </div>
                                <div className="signup-login-footer--form">
                                    <div className="signup-login--account-exist">
                                        Don't have an account?
                                        <button
                                            onClick={(e) => clickToRegister()}
                                            className="login-click"
                                        >
                                            Register here
                                        </button>
                                    </div>
                                    <div className="signup-login--forgot-password">
                                        <p>Forgot your password?</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Login;
