import React from "react";

const CheckBox = ()=>{
    return(
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //paddingTop: 5
        }}>
            <input
                className="checkBox input-reset ba bg-transparent"
                type="checkbox"
                style={{marginLeft: 5}}
            />
            <label className="db fw6 lh-copy f6" htmlFor="password">Show Password</label>
        </div>
    )
}
export default CheckBox
