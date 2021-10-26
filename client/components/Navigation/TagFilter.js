import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTags, saveSelectedTags } from "../../store/tag";
import MultiSelectDropdown from "./MultiSelectDropdown";

const TagFilter = () => {
    const userArticles = useSelector((state) => state.userArticles);
    const user = useSelector((state) => state.auth);
    const userTags = useSelector((state) => state.tags);
    // console.log("ALL TAGS > ", userTags);

    const selectedTags = useRef([]);
    const selectedTagsDD = useRef([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserTags(user.id));
    }, [dispatch]);

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
        console.log("=> SELECTEDTAGS.CURRENT >", selectedTags.current);
    };

    //
    const onDropDownSelectionChange = (selectedDropDownTags) => {
        selectedTagsDD.current = selectedDropDownTags;
    };

    //
    const onSubmitFilter = () => {
        const filters = selectedTags.current;
        selectedTagsDD.current.forEach((item) => filters.push(item.label));
        console.log("=> TAG_FILTEFILTERS > ", filters);
        dispatch(saveSelectedTags(filters));
    };

    return (
        <form className="tag-filter--form">
            <div className="tag-check">
                <label className="tag-check-label">
                    <input
                        type="checkbox"
                        onChange={(e) => onTagSelected(e, "isPrivate")}
                        className="tag-check-input"
                    />{" "}
                    <span className="text--tag-filter--form">
                        private bookmarks
                    </span>
                </label>
            </div>

            <div className="tag-check">
                <label className="tag-check-label">
                    <input
                        type="checkbox"
                        onChange={(e) => onTagSelected(e, "readAt")}
                        className="tag-check-input"
                    />{" "}
                    <span className="text--tag-filter--form">
                        read bookmarks
                    </span>
                </label>
            </div>

            <MultiSelectDropdown
                usrTagsProps={userTags}
                onChangeSelection={onDropDownSelectionChange}
            />

            <div>
                <input
                    type="button"
                    value="Submit"
                    className="button-secondary pure-button"
                    onClick={onSubmitFilter}
                />
            </div>
        </form>
    );
};

export default TagFilter;
