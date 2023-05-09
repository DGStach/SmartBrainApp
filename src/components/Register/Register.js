import React from "react";
import "../../App.css";
import passwordSeeFun from "../../UtilCommon";
import CheckBox from "../CheckBox/CheckBox";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            entries: "",
            errMessage: '',
            passType: "password"
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }


    onSubmitSignIn = (e) => {
        // debugger
        e.preventDefault();
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                entries: this.state.entries
            })

        })

            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                } else {
                    this.setState({errMessage: user})
                }
            })
    }

    render() {
        const {passType} = this.state
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure" onSubmit={this.onSubmitSignIn}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
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
                            </div>
                            <div onClick={()=>{
                                this.setState({passType:passwordSeeFun(passType)})
                            }}>
                                <CheckBox/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Register