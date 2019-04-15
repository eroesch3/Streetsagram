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
    //   this.getOnePhoto=this.getOnePhoto.bind(this)
    this.getPhoto=this.getPhoto.bind(this)
    }
    
    getPhoto = async () => {
        console.log(this.props)
        axios
          .get(`http://localhost:3001/photo/${this.props.match.params.id}`)
          .then(response=> {
              this.setState({photo: response})
              console.log('get single photo response.data', response)
          })
          .catch((error)=> {
            console.log("Error:", error)
          })
      }

    componentDidMount(){
        this.getPhoto()
    }

    // getOnePhoto(){
    //     fetch(`http://localhost:3001/photo/${this.props.match.params.id}`)
    //     .then(response=>{
    //         // console.log(response)
    //         return response
    //     })
    //     .then(data=>{
    //         console.log('data',data)
    //         // this.setState({building: data.building})
    //     })
    // }
    render(){

        return(
            <div className='SinglePhoto--contain'>
                <UpdatePhoto />
            </div>
        )
    }
}
export default SinglePhoto