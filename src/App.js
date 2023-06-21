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
    clicker: 1,
    input: '',
    imageUrl: '',
    imagePath: '',
    box: [],
    imageData: {},
    route: 'signin',
    isSignedIn: true,
    user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: '',
        number: ''
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState
    }

    componentDidMount() {
        const clicker = localStorage.getItem("clicker");
        this.setState({clicker:Number(clicker)})

    }

    Clicker = (event) => {
        let counter = this.state.clicker
        counter = counter + 1;
        this.setState({
            clicker: counter
        })
        localStorage.setItem("clicker", counter)
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
        //input - data from http picture
        this.setState({input: event.target.value})
        this.setState({imagePath: ""})
        this.setState({imageData: ""})
    }
    image64code = (event) => {
        // image Data - data from png/url photo
        this.setState({imageData: event.target.files[0]})
        this.setState({imagePath: event.target.value})
        this.setState({input: ""})
        this.setState({imageUrl: ""})
        this.setState({box: []});
    }

    onButtonSubmit = () => {
        this.setState({box: []});
        this.setState({imageUrl: this.state.input});
        let formData = new FormData();
        formData.append('imageUrl', this.state.input)
        formData.append('imageData', this.state.imageData)

        fetch('http://localhost:3002/imageurl', {
            method: 'post',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.status.description === "Ok") {
                    this.DisplayFaceBox(this.Coordinates(response))
                    fetch('http://localhost:3002/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(data => console.log(JSON.stringify(data.json())))
                        .then(res => res.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, {entries: count.entries}))
                        })
                        .catch(console.log)
                }
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
        const {isSignedIn, box, route, imageUrl, imagePath} = this.state;
        return (
            <div className="App">
                <button onClick={this.Clicker}>
                    {this.state.clicker}
                </button>
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
                            image64code={this.image64code}
                        />

                        <FaceRecognition box={box} imageUrl={imageUrl} imagePath={imagePath}/>
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
