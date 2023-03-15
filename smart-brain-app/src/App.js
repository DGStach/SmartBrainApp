import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from 'particles-bg'


class App extends Component {

    constructor() {
        super();
        this.state = {
            input: '',
        }

    }

    onInputChange = (event) => {
        console.log(event.target.value);
    }

    onButtonSubmit = (event) => {
        console.log('click');
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
                {/* <FaceRecognition/>*/}
            </div>
        );
    }
}

export default App;
