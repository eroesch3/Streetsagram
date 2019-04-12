import React, {Component} from 'react'
import axios from 'axios'

class PictureUpload extends Component {
    constructor(){
        super()
        this.state ={
            file: ''
        }
    this.submitFile=this.submitFile.bind(this)
    this.handleFileUpload=this.handleFileUpload.bind(this)
    }

    submitFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        let photo = this.state.file[0]
        let photoPost = formData.append('file', photo, photo.name)
        await photoPost
        console.log('form data', formData)
        console.log('photo', photo)
        console.log('photo post', photoPost)
        //axios.post
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:9000/test-upload',
        //     data: formData
        // })
        
        axios.post(`http://localhost:9000/test-upload`, photoPost, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=>{
            console.log('response', response)
            //return fetch ?
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