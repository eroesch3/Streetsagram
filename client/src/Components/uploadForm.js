import React, { Component } from 'react'

const url='http://localhost:3001/photos/'

export default class Form extends Component {
  constructor(props){
    super(props)
      this.state={
        email: '',
        url: '',  
        description: '',  
        street: '',
        cross_street: ''  
      }
  }
  
  onFormChange=event=>{
    const{name,value}=event.target
    this.setState({
      [name]:value
    })
  }

  onFormSubmit=event=>{
    event.preventDefault()
    let data = {
      url: this.state.url,
      description: this.state.description,
      street: this.state.street,
      cross_street: this.state.cross_street
  }

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // .then(response => response.json())
  .then(res=>res.text())
  .then(text=>console.log(text))
  
  this.setState({
    url: '',
    description:'',
    street: '',
    cross_street: ''
  })
}

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        
        <div className='uploadform--uploadform--url'>
          <label htmlFor='url'>Photo Url</label>
          <br />
          <input
            name='url'
            type='url'
            value={this.state.value}
            onChange={this.onFormChange}
          />
        </div>

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

