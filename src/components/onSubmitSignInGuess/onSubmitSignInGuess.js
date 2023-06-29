import React from "react";

const onSubmitSignInGuess = () => {
/*    const signInFun = () => {
        let a = new Date()

        this.setState({spinner: true});

        /!*
        fetch('https://smartbrainappbackend.onrender.com/signin', {
*!/
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: "Dagmarka1@wp.pl",
                password: "Dagmarka1@wp.pl"
            })
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
    }*/

    return (
        <div>
            <input
/*
                onClick={()=>{console.log("blablabl");this.signInFun}}
*/
                className="b mt2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="button"
                value="Login as Guess"/>
        </div>
    )
}

export default onSubmitSignInGuess()