import React, { Component } from 'react'
import UpdatePhoto from './updatePhoto'
import axios from 'axios'
import { timingSafeEqual } from 'crypto';

class SinglePhoto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: [],
    }
    this.getPhoto = this.getPhoto.bind(this)
    this.showPhoto = this.showPhoto.bind(this)
  }

  getPhoto = async () => {
    axios
      .get(`https://streetstagram.herokuapp.com/photo/${this.props.match.params.id}`)
      .then(response => {
        const photo = this.state.photo
        const singlePhoto = response.data.photo
        const setPhoto = photo.push(singlePhoto)
        console.log('axios get singplephoto', singlePhoto)
        console.log('axios get set photo', photo)
        return this.setState({ photo: photo })
      })
      .catch((error) => {
        console.log("Error:", error)
      })
  }

  componentDidMount() {
    this.getPhoto()
  }

  showPhoto() {
    const singlePhoto = this.state.photo

    return singlePhoto.map((photo) =>
      <div className='singlePhoto--photoContain' key={photo.id}>
        <div className='singlePhoto--photoContain--photoDetails'>
          <img className='singlePhoto--photoContain--photo' src={photo.image} />
          <div className='singlePhoto--photoContain--photoDetails--description'>{photo.description}</div>
          <div className='singlePhoto--photoContain--photoDetails--street'>{photo.street} X {photo.cross_street}</div>
        </div>
        <div className='singlePhoto--photoContain--photoUD'>
          <div className='singlePhoto--photoContain--photoUD--update'>
            <UpdatePhoto
             
              photoId={photo.id}
              url={photo.url}
              description={photo.description}
              street={photo.street}
              cross_street={photo.cross_street} />
          </div>
        </div>
      </div>
    )

  }

  render() {
    console.log('render show state description', this.state.photo)
    return (

      <div className='singlePhoto' >
        {this.showPhoto()}
      </div>
    )
  }
}
export default SinglePhoto