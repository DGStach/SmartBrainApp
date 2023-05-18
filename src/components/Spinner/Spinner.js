import React from "react";
import {FadeLoader} from "react-spinners";

function Spinner({spinnerState}) {

    return (
        <div style={{display : "inline-flex", margin : "15"}}>
            <FadeLoader
                color={"black"}
                loading={spinnerState}
                speedMultiplier={0.8}
            />
        </div>
    );
}

export default Spinner;