import React from "react";

const Navigation = ({onRouteChange, isSignedIn, sessionOF}) => {
    if (isSignedIn){
        return(
        <nav style={{display: "flex", justifyContent: "flex-end"}}>
            <p onClick={()=>onRouteChange('signin')}
               className='link dim black underline pa3 pointer'>Sign In</p>
            <p onClick={()=>onRouteChange('register')}
               className='link dim black underline pa3 pointer'>Register</p>
        </nav>
    );
    } else{
        return (
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
            <p onClick={()=>{console.log("sessionOF")}}
            className='link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        )};
}
export default Navigation