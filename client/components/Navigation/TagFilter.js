import React from "react";

const TagFilter = () => {
    return (
        <>
            <form className="tag-filter--form">
                <div className="tag-check">
                    <label className="tag-check-label">
                        <input
                            type="checkbox"
                            // checked={}
                            // onChange={}
                            className="tag-check-input"
                        />
                        Tag 1
                    </label>
                </div>
                <div className="tag-check">
                    <label className="tag-check-label">
                        <input
                            type="checkbox"
                            // checked={}
                            // onChange={}
                            className="tag-check-input"
                        />
                        Tag 2
                    </label>
                </div>
                <div className="tag-check">
                    <label className="tag-check-label">
                        <input
                            type="checkbox"
                            // checked={}
                            // onChange={}
                            className="tag-check-input"
                        />
                        Tag 3
                    </label>
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </>
    );
};

export default TagFilter;
