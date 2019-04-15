import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './Components/Nav'
import axios from 'axios'
import PhotosFeed from './Components/PhotosFeed.js'
import UploadForm from './Components/uploadForm'
import {
  Route,
  Link,
  Redirect,
  Switch
 } from "react-router-dom"





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
      <div>
      <div className="App">
          <Nav />
          <Switch>
          <main>
          <Route exact path="/" render={() => <PhotosFeed photos={this.state.photos}/> } />
          <Route exact path="/Post" render={() => <UploadForm/>} />
          </main>
      </Switch>    
      </div>
      </div>
    );
  }
}

export default App;

