import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import Nav from './Components/Nav'
import axios from 'axios'
import PhotosFeed from './Components/PhotosFeed.js'
import UploadForm from './Components/uploadForm'


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      photos: [] 
    }
  this.getPhotosFeed=this.getPhotosFeed.bind(this)
  this.addPhoto=this.addPhoto.bind(this)
}

addPhoto = async (url) => {
  let photos = this.state.photos
  photos.push(url)
  this.setState({photos})
}

getPhotosFeed = async () => {
  axios
    .get('http://localhost:3001/')
    .then(response=> {
      console.log('axios get', response.data.photos)
      return response.data.photos

      })
      .then(data=>{
        this.setState({photos: data})
        console.log('then axios set state', this.state.photos)
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
          <PhotosFeed photos={this.state.photos}/> 

          <main>
            <Route 
              path='/Post'
              component={UploadForm}
            />
          </main>
      </div>
    );
  }
}

export default App;
