import React, { Component } from 'react';
import './App.css';
// import { Route } from 'react-router-dom'
import Nav from './Components/Nav'
import axios from 'axios'
import PhotosFeed from './Components/PhotosFeed.js'



class App extends Component {
  constructor(props){
    super(props)
    this.state={
      photos: [] 
    }
  this.getPhotosFeed=this.getPhotosFeed.bind(this)
}

getPhotosFeed = async () => {
  axios
    .get('http://localhost:3001/')
    .then(response=> {
      console.log(response.data.photos)
      return response.data.photos
      
      })
      .then(data=>{
        this.setState({photos: data})
        console.log(this.state.photos)
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
      </div>
    );
  }
}

export default App;
