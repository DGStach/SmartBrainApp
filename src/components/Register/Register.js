import React from "react";
import "../../App.css";
import PasswordBox from "../PasswordBox/PasswordBox";
import Spinner from "../Spinner/Spinner";
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            entries: "",
            errMessage: '',
            passType: "password",
            spinner: false,
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value, errMessage: ''})
    }

    onSubmitSignInGuess = () => {
        this.setState({spinner: true});
        let a = new Date()
        fetch('https://smartbrainappbackend.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email:"Guess@gmail.com",
                password: "Guess@gmail.com"
            })
        })
            .then(res => res.json())
            .then(user => {
                let b = new Date()
                console.log("duration", a-b)
                if (user.id) {
                    console.log("user full data", user)
                    this.props.loadUser(user)
                    this.setState({spinner: false});
                    this.props.onRouteChange('home')
                }
            })
    }

    onSubmitSignIn = (e) => {
        e.preventDefault();

        const {email, password, name} = this.state;
        if (!name){
            this.setState({errMessage: "name field is empty"});
            return
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            this.setState({errMessage: "email format incorrect"});
            return;
        }
        if (!password){
            this.setState({errMessage: "password field is empty"});
            return
        }

        if (!/[A-Z]/.test(password)){
            this.setState({errMessage: "password must contain upper letter"});
            return;
        }
        if (!/[@#$%^&+!?=]/.test(password)){
            this.setState({errMessage: "password must contain special character @#$%^&+=!?"});
            return;
        }
        if (password.length<8){
            this.setState({errMessage: "min password length is 8 characters"});
            return;
        }
        this.setState({spinner: true})

        let a = new Date()
        fetch("https://smartbrainappbackend.onrender.com/register", {
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
                let b = new Date()
                console.log("duration", a-b)

                if (user.id) {
                    this.props.loadUser(user);
                    this.setState({spinner: false})
                    this.props.onRouteChange('home');
                }
                else {
                    this.setState({spinner: false, errMessage: "email address is already in use"})
                }
            }).catch(err=>{console.log("catch register", err)});
    }

    render() {
        return (
            <div>
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
                                    onChange={(event)=>{this.onNameChange(event); this.setState({errMessage: ''})}}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="email-address"
                                    id="email-address"
                                    onChange={(event)=>{this.onEmailChange(event); this.setState({errMessage: ''})}}
                                />
                            </div>
                            <PasswordBox
                                onPasswordChange = {this.onPasswordChange}/>
                            <div className="mt3 db fw6 lh-copy f6 dark-red">
                                {this.state.errMessage}
                            </div>
                        </fieldset>
                        <Spinner spinnerState={this.state.spinner}/>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                        <div>
                            <input
                                onClick={()=>{this.onSubmitSignInGuess()}}
                                className="b mt2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Login as Guess"/>
                        </div>
                        <br/><br/>
                        <div>First Login takes a long time</div>
                           <div>We are working on it :)</div>
                    </form>
                </main>
            </article>
            </div>
        );
    }
}


export default Register