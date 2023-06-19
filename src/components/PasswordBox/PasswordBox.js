import React, {Component} from "react";
import passwordSeeFun from "../../UtilCommon"
import "./PasswordBox.css"

class PasswordBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
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
                   onChange={(e)=>this.props.onPasswordChange(e)}

                />
                <div id="InlineInput" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <input
                        onClick={() => this.setState({passType: passwordSeeFun(passType)})}
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
