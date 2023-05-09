import React from "react";
import "./CheckBox.css";

const CheckBox = () => {
    return (
        <div className="CheckBoxContainer">
            <input
                className="checkBox input-reset ba bg-transparent"
                type="checkbox"
                id="checkbox_id"
            />
            <label for="checkbox_id" className="db fw6 lh-copy f6" htmlFor="password">Show Password</label>

        </div>
    )
}
export default CheckBox
