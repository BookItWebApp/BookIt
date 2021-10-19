import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTags, saveSelectedTags } from "../../store/tag";
import FormFilters from "./FormFilters";

const TagFilter = () => {
    const userArticles = useSelector((state) => state.userArticles);
    const user = useSelector((state) => state.auth);
    const userTags = useSelector((state) => state.tags);

    const selectedTags = useRef([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserTags(user.id));
    }, [dispatch]);

    const onTagSelected = (e, tagName) => {
        const checked = e.target.checked;
        if (checked) {
            selectedTags.current.push(tagName);
        } else {
            selectedTags.current = selectedTags.current.filter(
                (item) => item !== tagName
            );
        }
        console.log("SELECTED TAGS >", selectedTags.current);
    };

    const onsubmitFilter = () => {
        dispatch(saveSelectedTags(selectedTags.current));
    };

    return (
        <>
            <form className="tag-filter--form">
                {userTags.tags.map((tag, idx) => {
                    // console.log("TAG > ", tag);
                    return (
                        <div className="tag-check" key={idx}>
                            <label className="tag-check-label">
                                <input
                                    type="checkbox"
                                    onChange={(e) => onTagSelected(e, tag)}
                                    className="tag-check-input"
                                />
                                {tag}
                            </label>
                        </div>
                    );
                })}

                <div className="form-check">
                    <label className="form-check-label">
                        <input
                            type="checkbox"
                            // checked={isPrivate}
                            onChange={(e) => onTagSelected(e, "Private")}
                            className="form-check-input"
                        />
                        Private
                    </label>
                </div>

                <div className="form-check">
                    <label className="form-check-label">
                        <input
                            type="checkbox"
                            // checked={isRead}
                            // onChange={onChangeRead}
                            onChange={(e) => onTagSelected(e, "Read")}
                            className="form-check-input"
                        />
                        Read
                    </label>
                </div>

                <div>
                    <input
                        type="button"
                        value="Submit"
                        onClick={onsubmitFilter}
                    />
                </div>
            </form>
        </>
    );
};

export default TagFilter;
