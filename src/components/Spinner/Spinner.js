import React from "react";
import {FadeLoader} from "react-spinners";

function Spinner({spinerState}) {

    return (
        <div style={{display : "inline-flex", margin : "15"}}>
            <FadeLoader
                color={"black"}
                loading={spinerState}
                speedMultiplier={0.8}
            />
        </div>
    );
}

export default Spinner;