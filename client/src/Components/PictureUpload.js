import React, {Component} from 'react'
import axios from 'axios'

class PictureUpload extends Component {
    constructor(props){
        super(props)
        this.state ={
            file: null
        }
    this.submitFile=this.submitFile.bind(this)
    this.handleFileUpload=this.handleFileUpload.bind(this)
    }

    submitFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        let photo = this.state.file[0]
        formData.append('file', photo, photo.name)
        axios.post(`https://streetstagram.herokuapp.com/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=>{
            console.log(response.data)
            this.props.setPictureURL(response.data.Location)
        }).catch(error=>{
            console.log(error)
        })
    }

    handleFileUpload = async (e) => {
        await this.setState({file: e.target.files})
    }

    render(){
        return(
            <form onSubmit={this.submitFile}>
                <input 
                    label='upload file' 
                    type='file' 
                    onChange={this.handleFileUpload}
                />
                <button type='submit'>Send</button>
            </form>
        )
    }
}
export default PictureUpload