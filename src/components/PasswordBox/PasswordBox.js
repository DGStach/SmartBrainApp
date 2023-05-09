import React, {Component} from "react";
import {getKeyEventProps} from "@testing-library/user-event/dist/keyboard/getEventProps";
import passwordSeeFun from "../../UtilCommon"
class PasswordBox extends Component {
    constructor() {
        super ();
        this.state = {
            passType: "text"
        }
    }

    render() {
        const {passType} = this.state
        return (
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type={passType}
                    name="password"
                    id="password"
                    minLength="8"
                    maxLength="20"
                    pattern="^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$"
                    title="min password length is 8 characters, at least one lowercase and uppercase and one character from set @#$%^&+= "
                    onChange={this.onPasswordChange}/>
                <div id="InlineInput" style = {{display : "flex", justifyContent : "center", alignItems : "center"}}>
                    <input
                        onClick={()=>this.setState({passType: passwordSeeFun(passType)})}
                        className="checkBox input-reset ba bg-transparent"
                        type="checkbox"
                        id="abc"
                    />
                    <label htmlFor="abc" className="db fw6 lh-copy f6">See password</label>
                </div>
            </div>
        )
    }
}

export default PasswordBox
