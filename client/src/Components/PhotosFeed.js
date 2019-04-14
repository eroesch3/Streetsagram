import React, {Component} from 'react'

class PhotosFeed extends Component {
    // constructor(props){
    //     super(props)
    // this.photoStreamFunc = this.photoStreamFunc.bind(this)    
    

    // photoStreamFunc(){
    //     let feed = this.props.feedphoto
        

    //     return this.props.feedphoto.map(element=> {
    //         console.log(element.photos)
    //         return (
    //             <div>
    //                 <img src={element.photos} alt="hgfd" />       
    //             </div>
    //         )

    //         })
        
    // }
    

  render () {
    let feed = this.props.feedphoto.photos.map((element)=>(
        <li>{element}</li>
    ))

    return (
      <div>
          <img id="feed_image" src={element.image}/>
         {/* {this.photoStreamFunc()}  */}
      </div>
    )
  }
}
export default PhotosFeed
