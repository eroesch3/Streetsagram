import React, {Component} from 'react'

class PhotosFeed extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     photos: ''
        // }
    this.photoStreamFunc = this.photoStreamFunc.bind(this)    
    }
    photoStreamFunc(){
        console.log(this.props[0].image)
        // return this.props.photos.map(photos => (
        //     <div>
        //         {console.log(photos)}
        //     </div>
        // ))     
    }
   
    

  render () {
    return (
      <div>
         {/* {this.photoStreamFunc()}  */}
    </div>
    )
  }
}


export default PhotosFeed