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
    imagePath: '',
    box: [],
    imageData: {},
    route: 'register',
    isSignedIn: false, // true or false
    login: "", //  'signout' or empty ""
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
    constructor(props) {
        super(props);
        this.state = initialState
    }

    componentDidMount() {
        const UserDataEntries = localStorage.getItem("UserDataEntries")
        const UserDataId = localStorage.getItem("UserDataId")
        const UserDataName = localStorage.getItem("UserDataName")

        if (UserDataName) {
            this.setState({route: "home"})
            this.setState({isSignedIn:true})
            this.setState({user:{name: UserDataName,entries: UserDataEntries, id: UserDataId }})
        }

        if (this.state.login === "signout"){
            localStorage.removeItem("UserDataName")
            localStorage.removeItem("UserDataEntries")
            localStorage.removeItem("UserDataId")
        }
    }

    sessionOF = (login) =>{
        this.setState({login : login})
        localStorage.removeItem("UserDataName")
        localStorage.removeItem("UserDataEntries")
        localStorage.removeItem("UserDataId")
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

    exampleImageUrl = (imageUrl) => {
        this.setState({input: imageUrl})
        this.setState({imageUrl: imageUrl})
        this.setState({imagePath: ""})
        this.setState({imageData: ""})
        this.setState({box: []});
        setTimeout(()=>this.onButtonSubmit(),0)
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

        fetch('http://localhost:3001/imageurl', {
            method: 'post',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.status.description === "Ok") {
                    this.DisplayFaceBox(this.Coordinates(response))
                    fetch('http://localhost:3001/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(res => res.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, {entries: count.entries}));
                        })
                };
                if (response.status.description === "Failure"){
                    alert(response.outputs[0].status.description)
                }
            })
            .catch(error => console.log
            (error + 'error'))
    }

    onRouteChange = (route) => {
            if (route === 'signin') {
                this.setState(initialState)
            }
            this.setState({isSignedIn: false})
            this.setState({route: route});
            if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        }

    render() {
        const {isSignedIn, box, route, imageUrl, imagePath} = this.state;
        const {name, entries} = this.state.user;

        return (
            <div className="App">
                <ParticlesBg type="cobweb" num={100} bg={true} v={800} color="#EEEEEE"/>
                <Navigation isSignedIn={isSignedIn}
                            onRouteChange={this.onRouteChange}
                            sessionOF = {this.sessionOF}
                />
                {route === 'home'
                    ? <div onKeyPress={(e)=>{if(e.key === "Enter"){this.onButtonSubmit()}}} >
                        <Logo/>
                        <Rank name={name} entries={entries}/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                            image64code={this.image64code}
                            exampleImageUrl = {this.exampleImageUrl}
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
