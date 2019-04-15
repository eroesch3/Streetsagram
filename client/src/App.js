import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { withRouter } from "react-router";
import Nav from './Components/Nav'
import axios from 'axios'
import PhotosFeed from './Components/PhotosFeed.js'
import UploadForm from './Components/uploadForm'

global.serverurl= 'http://localhost:3001'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      photos: [],
    }
  this.getPhotosFeed=this.getPhotosFeed.bind(this)
  this.deletePhotoFromState=this.deletePhotoFromState.bind(this)
}

getPhotosFeed = async () => {
  console.log('something')
  axios
    .get(global.serverurl)
    .then(response=> {
      console.log('axios get', response.data.photos)
      return response.data.photos

      })
      .then(data=>{
        console.log(data)
        this.setState({photos: data})
        console.log('then axios set state', this.state.photos)
    })
    .catch((error)=> {
      console.log("Error:", error)
    })
}

deletePhotoFromState(photoid, index){
  this.state.photos.forEach((photo)=>{
    if (photo.id == photoid){
      const photosArray = [...this.state.photos]
      photosArray.pop(index)
      this.setState({photos: photosArray})
    }
  })

}

componentDidMount = () => {
  this.getPhotosFeed()
}


  render() {
    return (
      <div className="App">
          <Nav />
          <main>
            <Route 
              path='/Post'
              render={() => <UploadForm/>} 
            />
            <Route 
              path='/' 
              render={()=> <PhotosFeed photos={this.state.photos} deletePhotoFromState={this.deletePhotoFromState}/>}
            />

          </main>
      </div>
    );
  }
}

export default App
