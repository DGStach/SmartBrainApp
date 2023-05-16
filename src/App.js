import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from 'particles-bg';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const initialState = {
    input: '',
    imageUrl: '',
    box: [],
    route: 'home',
    isSignedIn: true,
    user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: '',
        number: 3
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    Coordinates = (data) => {
        // const faceSquare = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        const box = []

        for (const value of Object.values(data.outputs[0].data.regions)) {
            let faceSquare = value.region_info.bounding_box;
            box.push({
                leftCol: faceSquare.left_col * width,
                topRow: faceSquare.top_row * height,
                rightCol: width - (faceSquare.right_col * width),
                bottomRow: height - (faceSquare.bottom_row * height)
            });
        }
        return box
    }

    DisplayFaceBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }


    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        fetch('https://smartbrainappbackend.onrender.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status.description === "Ok") {
                    fetch('https://smartbrainappbackend.onrender.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(res => res.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, {entries: count.entries}))
                        })
                        .catch(console.log)
                }
                this.DisplayFaceBox(this.Coordinates(response))
            })
            .catch(error => console.log
            (error + 'error'))
    }

    onRouteChange = (route) => {
        if (route === 'signin') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({isSignedIn: false})
        }
        this.setState({route: route});
    }

    render() {
        const {isSignedIn, box, route, imageUrl} = this.state;
        return (
            <div className="App">
                <ParticlesBg type="cobweb" num={100} bg={true} v={800} color="#EEEEEE"/>
                <Navigation isSignedIn={isSignedIn}
                            onRouteChange={this.onRouteChange}/>
                {route === 'home'
                    ? <div>
                        <Logo/>
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                    : (route === 'signin'
                            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )}
            </div>
        );
    }
}

export default App;
