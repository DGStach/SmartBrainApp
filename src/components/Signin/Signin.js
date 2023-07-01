import React from "react";
import PasswordBox from "../PasswordBox/PasswordBox";
import Spinner from "../Spinner/Spinner";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: "",
            spinner: false,
            signInEmailGuess: "Dagmarka1@wp.pl",
            signInPasswordGuess: "Dagmarka1@wp.pl"
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = (data) => {

        this.setState({spinner: true});
        let a = new Date()

        fetch('https://smartbrainappbackend.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(user => {
                let b = new Date()
                console.log("duration", a - b);
                if (user.id) {
                    this.props.loadUser(user)
                    this.setState({spinner: false});
                    this.props.onRouteChange('home')
                }
            })
        this.setState({spinner: false});

    }


    render() {
        const {onRouteChange} = this.props;
                const {signInPasswordGuess,signInPassword, signInEmailGuess, signInEmail, spinner} = this.state

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
                            <PasswordBox onPasswordChange={this.onPasswordChange}/>
                        </fieldset>
                        <Spinner spinnerState={spinner}/>
                        <div>
                            <input
                                onClick={() => {
                                    this.onSubmitSignIn({
                                        email: signInEmail,
                                        password: signInPassword
                                    })
                                }}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Sign in"/>
                        </div>
                        <div>
                            <input
                                onClick={() => this.onSubmitSignIn({
                                    email: signInEmailGuess,
                                    password: signInPasswordGuess
                                })}
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