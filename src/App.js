import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from 'particles-bg'
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const clarifaiResponse = (imageUrl) => {
    const PAT = 'abb9da9a0fbe4790be73ebbc9a135aed';
    const USER_ID = 'otiu4hjtbvkm';
    const APP_ID = 'test';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions
}



    class App extends Component {
        constructor() {
            super();
            this.state = {
                input: '',
                imageUrl: '',
                box: {},
                route: 'signin',
                isSignedIn: true,
                user: {
                    id: '',
                    name: '',
                    email: '',
                    entries: 0,
                    joined: ''
                }
            }
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
            const faceSquare = data.outputs[0].data.regions[0].region_info.bounding_box
            const image = document.getElementById('inputImage');
            const width = Number(image.width);
            const height = Number(image.height);

            return {
                leftCol: faceSquare.left_col * width,
                topRow: faceSquare.top_row * height,
                rightCol: width - (faceSquare.right_col * width),
                bottomRow: height - (faceSquare.bottom_row * height)
            }
        }

        DisplayFaceBox = (box) => {
            this.setState({box: box});
        }

        onInputChange = (event) => {
            this.setState({input: event.target.value})
        }


        onButtonSubmit = () => {
            this.setState({imageUrl: this.state.input});
            fetch("https://api.clarifai.com/v2/models/face-detection/outputs", clarifaiResponse(this.state.input))
                .then(response => response.json())
                .then(response => {
                    if (response) {
                        fetch('http://localhost:3000/image', {
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
                this.setState({isSignedIn: true})
            } else if (route === 'home') {
                this.setState({isSignedIn: false})
            }
            this.setState({route: route});
        }

        render() {
            const {isSignedIn, box, route, imageUrl} = this.state;
            return (
                <div className="App">
                    <ParticlesBg type="cobweb" num={40} bg={true} v={1000} color="#EEEEEE"/>
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
