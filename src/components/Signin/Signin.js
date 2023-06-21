import React from "react";
import PasswordBox from "../PasswordBox/PasswordBox";
/*
import SigninGuess from "../SigninGuess/SigninGuess"
*/

import Spinner from "../Spinner/Spinner";
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: "",
            spinner: false,
            signInEmailGuess: "Guess@gmail.com",
            signInPasswordGuess: "Guess@gmail.com",
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignInGuess = () => {
        this.setState({spinner: true});
        fetch('https://smartbrainappbackend.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmailGuess,
                password: this.state.signInPasswordGuess
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.setState({spinner: false});
                    this.props.onRouteChange('home')
                }
            })
    }

    onSubmitSignIn = () => {
        this.setState({spinner: true});
        fetch('https://smartbrainappbackend.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmailGuess,
                password: this.state.signInPasswordGuess
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.setState({spinner: false});
                    this.props.onRouteChange('home')
                }
            })
    }

    render() {
        const {onRouteChange} = this.props;

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"/>
                            </div>
                         <PasswordBox onPasswordChange = {this.onPasswordChange} />
                        </fieldset>
                        <Spinner spinnerState= {this.state.spinner}/>
                        <div >
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Sign in"/>
                        </div>
                        <div>
                            <input
                                onClick={this.onSubmitSignInGuess}
                                className="b mt2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Login as Guess"/>
                        </div>
                        <i className="fa fa-eye-slash" aria-hidden="false"></i>
                        <div className="lh-copy mt3">
                            <p onClick={() => {
                                onRouteChange('register')
                            }}
                               className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}

export default Signin