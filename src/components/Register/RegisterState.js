import React from "react";
import Register from "./Register";
import PasswordBox from "../PasswordBox/PasswordBox";

class RegisterState extends Comment {
    constructor() {
        super();
        this.state = {
            email: this.props.email,
            password: "",
            name: "",
            entries: "",
            errMessage: '',
            passType: "password"
        }
    }

    render() {
        const {email} = this.props
        return (
            <div>
                <Register email={email}/>
                <PasswordBox/>
                <button onClick={()=>console.log("email-->" + email)}></button>
            </div>
        )
    }
}

export default RegisterState