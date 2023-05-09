import React from "react";
import "./CheckBox.css";

const CheckBox = ({ggg}) => {

    return (
        <div className="CheckBoxContainer" onClick={ggg} >
                <input
                    className="checkBox input-reset ba bg-transparent"
                    type="checkbox"
                    id="abc"
                />
            <label for="abc" className="db fw6 lh-copy f6">Password</label>
        </div>
    )
}
export default CheckBox