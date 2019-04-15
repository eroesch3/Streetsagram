import React, { Component } from 'react'
import axios from 'axios'

export default class DeletePhoto extends Component {
  constructor(props){
    super(props)
      
    this.deletePhoto=this.deletePhoto.bind(this)
    }
  
    deletePhoto = async () => {
      axios.delete(`${global.serverurl}/photo/${this.props.photoid}`)
      .then(res=> this.props.deletePhotoFromState(this.props.photoid))
    }
    
    render () {
      return (
        <button onClick={()=> this.deletePhoto(this.props.photoid)}>
          Delete
        </button>
       
      )
    }
  }



  