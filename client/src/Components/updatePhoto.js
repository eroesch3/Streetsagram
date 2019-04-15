import React, {Component} from 'react'
import axios from 'axios'

class UpdatePhoto extends Component {
    constructor(props){
        super(props)
        this.state={
            file: null,
            image: '',  
            description: '',  
            street: '',
            cross_street: '' 
        }
    this.handleFileUpload=this.handleFileUpload.bind(this)
     //bind functions
    }

    onFormChange=event=>{
        const{name,value}=event.target
        this.setState({
          [name]:value
        })
      }
    
      handleFileUpload = async (e) => {
        await this.setState({file: e.target.files})
      }
    
      onFormSubmit= async (event)=>{
        event.preventDefault()
    
      const formData = new FormData();
      let photo = this.state.file[0]
      formData.append('file', photo, photo.name)
      await axios.post(`http://localhost:3001/upload`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }).then(response=>{
          console.log(response.data)
          this.props.setPictureURL(response.data.Location)
          this.setState({url:response.data.Location})
      }).catch(error=>{
          console.log(error)
      })
    
      let data = {
        id: this.props.photoId,
        image: this.state.url || this.props.url,
        description: this.state.description || this.props.description,
        street: this.state.street || this.props.street,
        cross_street: this.state.cross_street || this.props.cross_street
      }
    
      console.log('data', data)
    
      await fetch('http://localhost:3001/post', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('fetch', response)
        response.json()
      })
      
      this.setState({
        file: '',
        image: '',
        description:'',
        street: '',
        cross_street: ''
      })
    }
    //functions
    render(){
        return(
            <form className='updateform--updateformcontain' onSubmit={this.onFormSubmit}>
        
            <div className='updateform--updateform--url'>
              <label htmlFor='url'>Update Photo</label>
              <br />
              <input
                id='update--photoSelect'
                label='upload file' 
                type='file' 
                name='url'
                value={this.state.value}
                onChange={this.handleFileUpload}
              />
            </div>
    
            <div className='updateform--updateform--description'>
              <label htmlFor='description'>Photo Description</label>
              <br />
              <input
                id='update--photoDescription'
                name='description'
                type='string'
                value={this.state.value}
                onChange={this.onFormChange}
              />
            </div>  
    
            <div className='updateform--updateform--street'>        
              <label htmlFor='street'>Street</label>
              <br />
              <input
                id='update--photoStreet'
                name='street'
                type='string'
                value={this.state.value}
                onChange={this.onFormChange}
              />
            </div>  
    
            <div className='updateform--updateform--crossstreet'>
              <label htmlFor='cross_street'>Cross Street</label>
              <br />
              <input
                id='update--photoCross'
                name='cross_street'
                type='string'
                value={this.state.value}
                onChange={this.onFormChange}
              />
            </div>  
              
            <div className='updateform--updateform--button'>
              <button
                id='update--photoSubmit'
                type='submit'
                value='submit'
                text='Submit Photo'>
                Submit Photo</button>
            </div>  
    
          </form>
        )
    }
}
export default UpdatePhoto