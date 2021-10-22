import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTags, saveSelectedTags } from "../../store/tag";

const TagFilter = () => {
    const userArticles = useSelector((state) => state.userArticles);
    const user = useSelector((state) => state.auth);
    const userTags = useSelector((state) => state.tags);

    const selectedTags = useRef([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserTags(user.id));
    }, [dispatch]);

    // FUNC TO REMOVE DUPLICATED TAGS DATA
    const removeDuplicatedTags = (tagsData) => {
        const filterdData = tagsData.tags.filter((tag, idx) => {
            return tagsData.tags.indexOf(tag) === idx;
        });
        return filterdData;
    };
    const filteredTags = removeDuplicatedTags(userTags);

    //
    const onTagSelected = (e, tagName) => {
        const checked = e.target.checked;
        if (checked) {
            selectedTags.current.push(tagName);
        } else {
            selectedTags.current = selectedTags.current.filter(
                (item) => item !== tagName
            );
        }
    };

    const onsubmitFilter = () => {
        dispatch(saveSelectedTags(selectedTags.current));
    };

    return (
        <form className="tag-filter--form">
            {filteredTags.map((tag, idx) => {
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

            <div className="tag-check">
                <label className="tag-check-label">
                    <input
                        type="checkbox"
                        onChange={(e) => onTagSelected(e, "isPrivate")}
                        className="tag-check-input"
                    />
                    Private
                </label>
            </div>

            <div className="tag-check">
                <label className="tag-check-label">
                    <input
                        type="checkbox"
                        onChange={(e) => onTagSelected(e, "readAt")}
                        className="tag-check-input"
                    />
                    Read
                </label>
            </div>

            <div>
                <input
                    type="button"
                    value="Submit"
                    className="button-secondary pure-button"
                    onClick={onsubmitFilter}
                />
            </div>
        </form>
    );
};

export default TagFilter;
