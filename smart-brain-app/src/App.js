import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from 'particles-bg'
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"


const PAT = 'abb9da9a0fbe4790be73ebbc9a135aed';
const USER_ID = 'otiu4hjtbvkm';
const APP_ID = 'test';
const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg";


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

fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
     this.setState({imageUrl: this.state.input})
    }

    render() {
        return (
            <div className="App">
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <ParticlesBg type="cobweb" num={300} bg={true} color="#EEEEEE"/>
                 <FaceRecognition imageUrl = {this.state.imageUrl}/>
            </div>
        );
    }
}

export default App;
