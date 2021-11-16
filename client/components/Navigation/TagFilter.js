import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTags, saveSelectedTags } from "../../store/tag";
import MultiSelectDropdown from "./MultiSelectDropdown";

const TagFilter = () => {
    const userArticles = useSelector((state) => state.userArticles);
    const user = useSelector((state) => state.auth);
    const userTags = useSelector((state) => state.tags);
    console.log("ALL ARTICLES > ", userArticles);

    const selectedTags = useRef([]);
    const selectedTagsDD = useRef([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserTags(user.id));
    }, [dispatch]);

    //
    const filterReadUnread = (artilcesArr, statusRead) => {
        let readUnreadBookmark;
        if (statusRead) {
            readUnreadBookmark = artilcesArr.filter((singleBookmark) => {
                if (singleBookmark.readAt) {
                    return singleBookmark;
                }
            });
        } else {
            readUnreadBookmark = artilcesArr.filter((singleBookmark) => {
                if (!singleBookmark.readAt) {
                    return singleBookmark;
                }
            });
        }
        return readUnreadBookmark;
    };
    console.log("TRUE>", filterReadUnread(userArticles, true));
    console.log("FALSE>", filterReadUnread(userArticles, false));

    //
    const onTagSelected = (e, tagName, statusRead = null) => {
        const checked = e.target.checked;
        console.log("CHECKED > ", checked);
        console.log("E.TARGET > ", e.target);
        console.log("E.statusRead > ", statusRead);

        if (checked && statusRead === true) {
            selectedTags.current.push(tagName);
        } else if (checked && statusRead === false) {
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
        console.log("SUBMIT: SELECTED TAGS CURRENT >", selectedTags.current);
        const filters = [...selectedTags.current];
        console.log("SUBMIT: FILTERS >", filters);

        selectedTagsDD.current.forEach((item) => filters.push(item.label));
        dispatch(saveSelectedTags(filters));
    };

    return (
        <form className="tag-filter--form">
            <div className="tag-check">
                <label className="tag-check-label">
                    <input
                        type="checkbox"
                        onChange={(e) => onTagSelected(e, "readAt", true)}
                        className="tag-check-input"
                    />{" "}
                    <span className="text--tag-filter--form">
                        read bookmarks
                    </span>
                </label>
            </div>

            <div className="tag-check">
                <label className="tag-check-label">
                    <input
                        type="checkbox"
                        onChange={(e) => onTagSelected(e, "readAt", false)}
                        className="tag-check-input"
                    />{" "}
                    <span className="text--tag-filter--form">
                        unread bookmarks
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
