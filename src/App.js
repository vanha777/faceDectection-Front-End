import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import Signin from './Components/Signin/Signin.js';
import { motion } from "framer-motion"







import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js';
import Register from './Components/Register/Register.js'

import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js'


















class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      face: [],
      box: [{}],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }

    };
  }

  addEntries = (e) => {
    e.preventDefault();
    fetch('http://localhost:777/image', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=UTF-8', },
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then((res) => res.json())
      .then((res) => {
        const updateEntries = Object.assign(this.state.user, { entries: res[0].entries });
        this.setState({ user: updateEntries });
      })
      .catch((err) => console.log(`Front-end failed to add entries ${err}`));
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

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  displayFace = (data) => {
    this.setState({ box: data })
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route === 'home') {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({
        input: '',
        imageURL: '',
        face: [],
        box: [],
        isSignedIn: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        }
      });
    }
  }

  locateFace = (data) => {
    const imageComponents = document.getElementById('image');
    const imageHeight = Number(imageComponents.height);
    const imageWidth = Number(imageComponents.width);
    let boxes =
      data.map(values => {
        return {
          top_row: values.top_row * imageHeight,
          right_col: imageWidth - (values.right_col * imageWidth),
          bottom_row: imageHeight - (values.bottom_row * imageHeight),
          left_col: values.left_col * imageWidth
        }
      })
    return boxes;

  }


  onClickChange = (e) => {
    this.setState({ imageURL: this.state.input });
    //clarifai
    e.preventDefault();
    fetch('http://localhost:777/faceDetect', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8', },
      body: JSON.stringify({
        Url: this.state.input
      })
    }).then((res) => res.json())
      .then((res) => {
        this.addEntries(e);
        this.displayFace(this.locateFace((res)));
      })
      .catch((err) => console.log(`Front-end failed to fetch /faceDetect, ${err}`));
    //end.



  }


  render() {



    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App" >


        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />



        {this.state.route === 'home'
          ? <motion.div className='mt5' initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onClickChange={this.onClickChange}
              onClearChange={this.onClearChange}
            />
            <FaceRecognition imageURL={imageURL} box={box} />
          </motion.div>
          : (
            route === 'signin'
              ?
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : (
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )
          )




        }

      </div>
    );
  };
};

export default App;
