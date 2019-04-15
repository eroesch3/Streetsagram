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
    }
    
    getPhoto = async () => {
        console.log(this.props)
        axios
          .get(`http://localhost:3001/photo/${this.props.match.params.id}`)
          .then(response=> {
              this.setState({photo: response.data})
              console.log('get single photo response.data', response.data)
          })
          .catch((error)=> {
            console.log("Error:", error)
          })
      }

    componentDidMount(){
        this.getPhoto()
    }

    render(){

        return(
            <div className='SinglePhoto--contain'>
                <UpdatePhoto />
            </div>
        )
    }
}
export default SinglePhoto