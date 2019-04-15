import React, {Component} from 'react'
import DeletePhoto from './DeletePhoto.js'

class PhotosFeed extends Component {
    constructor(props){
        super(props)
        
    this.photoStreamFunc = this.photoStreamFunc.bind(this)    
    }




    photoStreamFunc(){
        const {photos} = this.props
        return photos.map((photo)=>
          <div className='photoStream--photoContain' key = {photo.id}>
            <img className='photoStream--photoContain--photo' src={photo.image}/>
            <div className='photoStream--photoContain--photoDetails'>
              <div className='photoStream--photoContain--photoDetails--description'>{photo.description}</div>
              <div className='photoStream--photoContain--photoDetails--street'>{photo.street} X {photo.cross_street}</div>
            </div>
            <div className='photoStream--photoContain--photoDelete'>
              <div className='photoStream-photoContain--photoDelete--delete'>
                <DeletePhoto deletePhotoFromState={this.props.deletePhotoFromState} photoid={photo.id}/>
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