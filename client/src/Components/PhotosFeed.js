import React, {Component} from 'react'

class PhotosFeed extends Component {
    constructor(props){
        super(props)
        this.state = {
            photos: []
        }
    this.photoStreamFunc = this.photoStreamFunc.bind(this)    
    }

    // componentDidMount(){
    //   // this.setState({photos:this.props.photos})
    //   console.log('photosFeed', this.state.photos)
    //   this.photoStreamFunc()
    // }

    photoStreamFunc(){
        const {photos} = this.props
        return photos.map((photo)=>
          <div className='photoStream--photoContain' key = {photo.id}>
            <img className='photoStream--photoContain--photo' src={photo.image}/>
            <div className='photoStream--photoContain--photoDetails'>
              <div className='photoStream--photoContain--photoDetails--description'>Description: {photo.description}</div>
              <div className='photoStream--photoContain--photoDetails--street'>Street: {photo.street}</div>
              <div className='photoStream--photoContain--photoDetails--cross_street'>Cross Street: {photo.cross_street}</div>
            </div>
          </div>
        )

        // this.setState({photos: this.props.photos})
        // console.log('photos feed component function', this.state.photos)
        // return this.props.photos.map(photos => (
        //     <div>
        //         {console.log(photos)}
        //     </div>
        // ))     
    }
   
    

  render () {
    return (
      <div>
         {this.photoStreamFunc()}
      </div>
    )
  }
}


export default PhotosFeed