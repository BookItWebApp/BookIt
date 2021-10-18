import React from "react";
import { connect } from "react-redux";

import Topbar from "./Navigation/Topbar";
import { createNewArticle, getArticles } from "../store/userArticles";

class CreateArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            url: "",
            isPrivate: false,
            // tags: ""
            tags: [""]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addTagPlaceHolder = this.addTagPlaceHolder.bind(this);
        this.onTagValueChange = this.onTagValueChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let userId = this.props.auth.id;
        let article = { ...this.state };
        article.isPrivate = article.isPrivate === "true";

        console.log("_CREATE SUBMIT STATE > ", this.state);
        this.props.createNewArticle(article, userId);
        // this.setState({})
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    addTagPlaceHolder(e) {
        console.log("CREATE ADD_TAG_ STATE", this.state);
        const { tags } = this.state;
        tags.push("");
        this.setState({ ...this.state, tags });
    }

    onTagValueChange(e, index) {
        const { value } = e.target;
        const { tags } = this.state;
        console.log("CREATE_ON_TAG_VALUE_CHANGE=> VALUES/TAGS", value, tags);
        tags[index] = value;
        this.setState({ ...this.state, tags });
    }

    render() {
        const { name, url, isPrivate, tags } = this.state;
        // console.log("_CREATE STATE > ", this.state);
        // console.log("_CREATE PROPS > ", this.props);
        // console.log("_CREATE USER ID> ", this.props.auth.id)

        return (
            <>
                <Topbar />
                <div className="create-new-article-component">
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Article name:</label>
                        <input
                            name="name"
                            value={name}
                            required
                            onChange={this.handleChange}
                        />
                        <br />
                        <label htmlFor="url">Article url:</label>
                        <input
                            name="url"
                            value={url}
                            required
                            type="text"
                            onChange={this.handleChange}
                        />
                        <br />
                        <label htmlFor="isPrivate">Private:</label>
                        <input
                            name="isPrivate"
                            value={isPrivate}
                            onChange={this.handleChange}
                        />
                        <br />
                        {tags.map((tag, index) => {
                            return (
                                <div key={index}>
                                    <label htmlFor="tags">Add tag</label>
                                    <input
                                        name="tags"
                                        value={tag}
                                        onChange={(e) =>
                                            this.onTagValueChange(e, index)
                                        }
                                    />
                                </div>
                            );
                        })}
                        <button onClick={this.addTagPlaceHolder}>+</button>
                        {/* <label htmlFor="tags">Add tag</label>
                        <input
                            name="tags"
                            value={tags}
                            onChange={this.handleChange}
                        /> */}
                        <br />
                        <button type="submit">Create Article</button>
                    </form>
                </div>
            </>
        );
    }
}

const mapState = (state) => {
    console.log("CREATE MAP_STATE > ", state);
    return {
        auth: state.auth,
        userArticles: state.userArticles
    };
};

const mapDispatch = (dispatch, { history }) => {
    return {
        createNewArticle: (article, userId) =>
            dispatch(createNewArticle(article, userId, history)),
        getArticles: (id) => dispatch(getArticles(id))
    };
};

export default connect(mapState, mapDispatch)(CreateArticle);

// FORM I NEED:
{
    /* <form onSubmit={this.handleSubmit}>
<label htmlFor="name">Article name:</label>
<input name="name" value={name} type="text" onChange={this.handleChange} />
<br />

<label htmlFor="url">URL:</label>
<input name="url" value={url} required onChange={this.handleChange} />
<br />

<label htmlFor="public">Private:</label>
<input name="private" value={private} onChange={this.handleChange} />
<br />

<label htmlFor="tags">Add tag</label>
<input name="tags" value={tags} onChange={this.handleChange} />
<br />

<button type="submit">Create Article</button>
</form> */
}
