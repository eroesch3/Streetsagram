import React, {Component} from 'react'
import DeletePhoto from './DeletePhoto.js'
import UpdatePhoto from './updatePhoto'
import {Link} from 'react-router-dom'

class PhotosFeed extends Component {
    constructor(props){
        super(props)
        
    this.photoStreamFunc = this.photoStreamFunc.bind(this)    
    }


    photoStreamFunc(){
        const {photos} = this.props
        return photos.map((photo)=>
          <div className='photoStream--photoContain' key = {photo.id}>
            <a href={`/photo/${photo.id}`}><img className='photoStream--photoContain--photo' src={photo.image}/></a>
            <div className='photoStream--photoContain--photoDetails'>
              <div className='photoStream--photoContain--photoDetails--description'>{photo.description}</div>
              <div className='photoStream--photoContain--photoDetails--street'>{photo.street} X {photo.cross_street}</div>
            </div>
        )
            <div className='photoStream--photoContain--photoUD'>
              <div className='photoStream--photoContain--photoUD--update'>
                <UpdatePhoto 
                  photoId = {photo.id}
                  url={photo.url}
                  description={photo.description}
                  street={photo.street}
                  cross_street={photo.cross_street}/>
              </div>
            </div>
          </div>
        )   
  
    }
  

  render () {
    return (
      <div className='photoStream'>
         {this.photoStreamFunc()}
      </div>
    )
  }
}


export default PhotosFeed