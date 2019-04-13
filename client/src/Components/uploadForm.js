import React, { Component } from 'react'
import PictureUpload from './PictureUpload'
import axios from 'axios'

const url='http://localhost:3001/post'

export default class Form extends Component {
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
  await axios.post(`http://localhost:3005/upload`, formData, {
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
    image: this.state.url,
    description: this.state.description,
    street: this.state.street,
    cross_street: this.state.cross_street
  }

  console.log('data', data)

  await fetch(url, {
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

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        
        <div className='uploadform--uploadform--url'>
          <label htmlFor='url'>Select Photo</label>
          <br />
          <input
            label='upload file' 
            type='file' 
            name='url'
            value={this.state.value}
            onChange={this.handleFileUpload}
          />
        </div>

        {/* <div className='uploadform--uploadform--url'>
          <PictureUpload setPictureURL={this.props.setPictureURL}/>
        </div> */}

        <div className='uploadform--uploadform--description'>
          <label htmlFor='description'>Photo Description</label>
          <br />
          <input
            name='description'
            type='string'
            value={this.state.value}
            onChange={this.onFormChange}
          />
        </div>  

        <div className='uploadform--uploadform--street'>        
          <label htmlFor='street'>Street</label>
          <br />
          <input
            name='street'
            type='string'
            value={this.state.value}
            onChange={this.onFormChange}
          />
        </div>  

        <div className='uploadform--uploadform--crossstreet'>
          <label htmlFor='cross_street'>Cross Street</label>
          <br />
          <input
            name='cross_street'
            type='string'
            value={this.state.value}
            onChange={this.onFormChange}
          />
        </div>  
          
        <div className='uploadform--uploadform--button'>
          <button
            type='submit'
            value='submit'
            text='Submit Photo'>
            Submit Photo</button>
        </div>  

      </form>
    )
  }
}

