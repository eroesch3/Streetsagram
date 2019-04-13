import React, { Component } from 'react';
import './App.css';
import { Switch, Link, Route } from 'react-router-dom'
import ImageUploader from 'react-images-upload';
import Feed from './Components/Feed'
import PictureUpload from './Components/PictureUpload'
import Nav from './Components/Nav'
import LogIn from './Components/LogIn'
import Form from './Components/uploadForm.js'

/* import components here */

/* global variables here */

class App extends Component {
  constructor(props){
    super(props)
    this.state={
/*set state here */
      pictureURLS: []
    }
/*bind functions here */
this.setPictureURL=this.setPictureURL.bind(this)
  }

/* write functions here */
setPictureURL = async (url) =>{
  let photos = this.state.pictureURLS
  console.log('url set picture', url)
  photos.push(url)
  this.setState({pictureURLS:photos})
  console.log('state', this.state.pictureURLS)
}

  render() {
    return (
      <div className="App">
          <Nav />
          <Form />


          <Route 
            path='/LogIn'
            component={LogIn}
          />  

          <Route 
            path='/Feed'
            component={Feed}
          /> 

          {/*create container div for routes
          define 'switch'
          */}

          <PictureUpload setPictureURL={this.setPictureURL}/>
          
          {/* route paths: use "buildings-app" assignment for model */}
      </div>
    );
  }
}

export default App;
