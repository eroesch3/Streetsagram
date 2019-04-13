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
        fetch(`http://localhost:3005/upload`, {
            method: 'POST',
            body: formData,
        })
        .then(response=>{
            this.props.setPictureURL(response.url)
        }).catch(error =>{
            console.log('error catch', error)
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