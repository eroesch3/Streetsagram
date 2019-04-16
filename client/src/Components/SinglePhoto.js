import React, {Component} from 'react'
import UpdatePhoto from './updatePhoto'
import axios from 'axios'
import { timingSafeEqual } from 'crypto';

class SinglePhoto extends Component{
    constructor(props){
        super(props)
        this.state={
            file: null,
            url: '',  
            description: '',  
            street: '',
            cross_street: '',
            photo:[],
        }
    this.getPhoto=this.getPhoto.bind(this)
    this.displayPhoto=this.displayPhoto.bind(this)
    }
    
    getPhoto = async () => {
        console.log(this.props)
        axios
          .get(`http://localhost:3001/photo/${this.props.match.params.id}`)
          .then(response=> {
              this.setState({
                  url: response.data.image,
                  description: response.data.description,
                  street: response.data.street,
                  cross_street: response.data.cross_street
            })
              console.log('get single photo response', response.data)
          })
          .catch((error)=> {
            console.log("Error:", error)
          })
      }

    componentDidMount(){
        this.getPhoto()
    }

    displayPhoto(){
        const {photo} = this.state.photo
        return photo.map((photo)=>
          <div className='singlePhoto--photoContain' key = {photo.id}>
            <img className='photoStream--photoContain--photo' src={photo.image}/>
            <div className='singlePhoto--photoContain--photoDetails'>
              <div className='photoStream--photoContain--photoDetails--description'>{photo.description}</div>
              <div className='photoStream--photoContain--photoDetails--street'>{photo.street} X {photo.cross_street}</div>
            </div>
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
        )}

    render(){
        console.log('photo state', this.state.photo)
        return(
            <div className='SinglePhoto'>
                {/* {this.displayPhoto()} */}
            </div>
        )
    }
}
export default SinglePhoto