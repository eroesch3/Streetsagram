import React, { Component } from 'react';
import './App.css';
import { Switch, Link, Route } from 'react-router-dom'
// import ImageUploader from 'react-images-upload';
// import Feed from './Components/Feed'
// import PictureUpload from './Components/PictureUpload'
import Nav from './Components/Nav'
import LogIn from './Components/LogIn'
// import Form from './Components/uploadForm.js'
import axios from 'axios'
import PhotosFeed from './Components/PhotosFeed.js'

/* import components here */

/* global variables here */

class App extends Component {
  constructor(props){
    super(props)
    this.state={
/*set state here */
      // pictureURLS: [],
      photosFeed: photosFeed 
    }
/*bind functions here */
// this.setPictureURL=this.setPictureURL.bind(this)
this.getPhotosFeed=this.getPhotosFeed.bind(this)
}

/* write functions here */
// setPictureURL = async (url) =>{
//   let photos = this.state.pictureURLS
//   photos.push(url)
//   this.setState({pictureURLS:photos})
//   console.log('state on new picture upload', this.state.pictureURLS)
// }

getPhotosFeed = async () => {
  axios
    .get('http://localhost:3001/')
    .then((response)=> {
      console.log(response.data)
      const fphotos= response.data
      this.setState({
        photosFeed: fphotos
      })
    })
    .catch((error)=> {
      console.log("Error:", error)
    })
}

componentDidMount = () => {
  this.getPhotosFeed()
}

  render() {
    return (
      <div className="App">
          <Nav />
          {/* <Form setPictureURL={this.setPictureURL}/> */}
          <PhotosFeed render={()=><PhotosFeed feedphoto={this.state.photosFeed}/>}/>

          <Route 
            path='/LogIn'
            component={LogIn}
          />  

          {/* <Route 
            path='/Feed'
            component={Feed}
          />  */}

          {/*create container div for routes
          define 'switch'
          */}

          {/* <PictureUpload setPictureURL={this.setPictureURL}/> */}
          
          {/* route paths: use "buildings-app" assignment for model */}
      </div>
    );
  }
}

export default App;
