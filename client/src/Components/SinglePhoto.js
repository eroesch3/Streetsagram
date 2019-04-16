import React, {Component} from 'react'
import UpdatePhoto from './updatePhoto'
import axios from 'axios'
import { timingSafeEqual } from 'crypto';

class SinglePhoto extends Component{
    constructor(props){
        super(props)
        this.state={
            url: '',  
            description: '',  
            street: '',
            cross_street: '',
            photo:[],
        }
    this.getPhoto=this.getPhoto.bind(this)
    }
    
    getPhoto = async () => {
        axios
          .get(`http://localhost:3001/photo/${this.props.match.params.id}`)
          .then(response=> {
              const photo=this.state.photo
              const singlePhoto=response.data
              const setPhoto=photo.push(singlePhoto)
              return setPhoto
          })
          .catch((error)=> {
            console.log("Error:", error)
          })
      }

    componentDidMount(){
        this.getPhoto()
        // this.displayPhoto()
    }

    render(){
        console.log('render state in singlephoto', this.state.photo)
        return(
            
            <div className='singlePhoto--photoContain' >
                {/* <img className='photoStream--photoContain--photo' src={photo.image}/>
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
                </div> */}
                <UpdatePhoto />
            </div>
        )
    }
}
export default SinglePhoto