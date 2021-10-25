import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewUser } from "../store/users";

class NewUser extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: ""
        };

        this.updateHandler = this.updateHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    updateHandler(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    submitHandler(evt) {
        evt.preventDefault();
        this.props.createNewUser({ ...this.state });
        this.setState({
            username: "",
            email: "",
            password: ""
        });
    }

    render() {
        const { username, email, password } = this.state;
        const { updateHandler, submitHandler } = this;

        return (
            <div className="create-user-form">
                <h2>Sign Up</h2>
                <form onSubmit={submitHandler}>
                    <div className="input-row">
                        <label>Username</label>
                        <input
                            name="username"
                            onChange={updateHandler}
                            value={username}
                            placeholder="Ex: carlmarx123"
                        />
                    </div>
                    <div className="input-row">
                        <label>Email</label>
                        <input
                            name="email"
                            onChange={updateHandler}
                            value={email}
                            placeholder="Ex: carlmarx@greenshopper.com"
                        />
                    </div>
                    <div className="input-row">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={updateHandler}
                            value={password}
                            placeholder="Ex: ***"
                        />
                    </div>
                    <button className="signup-btn" type="submit">
                        Create Account
                    </button>
                </form>
            </div>
        );
    }
}

const mapDispatch = (dispatch, { history }) => {
    return {
        createNewUser: (userObject) =>
            dispatch(createNewUser(userObject, history))
    };
};

export default connect(null, mapDispatch)(NewUser);
