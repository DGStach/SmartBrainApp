
const onSubmitSignInGuess = () => {
    this.setState({spinner: true});

    let a = new Date()
    /*
            fetch('https://smartbrainappbackend.onrender.com/signin', {
    */
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
            console.log("duration", a-b);
            if (user.id) {
                this.props.loadUser(user)
                this.setState({spinner: false});
                this.props.onRouteChange('home')
            }
        })
}

export default onSubmitSignInGuess()