import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { signup } from "../../store/auth";

const Signup = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.id);
    const auth = useSelector((state) => state.auth);
    const history = useHistory();

    function clickToLogin() {
        history.push("/login");
    }

    // SETTING FORM VALIDATION RULES
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // GET FUNCTIONS TO BUILD FORM WITH USEFORM() HOOK
    const { register, handleSubmit, setError, reset, formState } =
        useForm(formOptions);
    const { errors, isSubmitting } = formState;

    //

    const onSubmit = async ({ username, email, password }) => {
        try {
            const formName = "signup";
            await dispatch(signup({ username, email, password }, formName));
        } catch (error) {
            console.log("CATCH ON_SUBMIT REGISTER ERR > ", error);
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
                        <h2>Register</h2>
                        <p>Fill in this form to create an account!</p>
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
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        type="text"
                                        {...register("email")}
                                        className={`form-control ${
                                            errors.email ? "is-invalid" : ""
                                        }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.email?.message}
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

                                <div className="form-group row">
                                    <label className="col-form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        {...register("confirmPassword")}
                                        className={`form-control ${
                                            errors.confirmPassword
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.confirmPassword?.message}
                                    </div>
                                </div>
                                {auth.error ? (
                                    <label className="login-error-label">
                                        {auth.error && auth.error.response && (
                                            <div className="signup-login-error-response">
                                                {" "}
                                                {auth.error.response.data}{" "}
                                            </div>
                                        )}
                                    </label>
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
                                        Register
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => reset()}
                                        className="btn btn-warning float-right"
                                    >
                                        Reset
                                    </button>
                                </div>
                                <div className="signup-login--account-exist">
                                    Already have an account?
                                    <button
                                        onClick={(e) => clickToLogin()}
                                        className="login-click"
                                    >
                                        Login here
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Signup;
