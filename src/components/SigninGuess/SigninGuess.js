import React from "react";

class SigninGuess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            signInEmailGuess: "Guess@gmail.com",
            signInPasswordGuess: "Guess@gmail.com",
        }
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
render (){
    return (
        <div>
            <input
                className="b mt2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="button"
                value="Login as Guess"
                onClick={this.onSubmitSignInGuess}
            />
        </div>
    )
}
}
export default SigninGuess
