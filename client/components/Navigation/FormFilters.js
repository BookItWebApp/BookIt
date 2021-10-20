import React from "react";

const FormFilters = () => {
    return (
        <>
            <form className="menu-filter--form">
                <div className="form-check">
                    <label className="form-check-label">
                        <input
                            type="checkbox"
                            // checked={isPublic}
                            // onChange={onChangePublic}
                            className="form-check-input"
                        />
                        Public
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input
                            type="checkbox"
                            // checked={isPrivate}
                            // onChange={onChangePrivate}
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
                            className="form-check-input"
                        />
                        Read
                    </label>
                </div>

                <div className="form-check">
                    <label className="form-check-label">
                        <input
                            type="checkbox"
                            // checked={isUnread}
                            // onChange={onChangeUnread}
                            className="form-check-input"
                        />
                        Unread
                    </label>
                </div>
                {/* <div>
            <input type="submit" value="Submit" />
          </div> */}
            </form>
        </>
    );
};

export default FormFilters;
