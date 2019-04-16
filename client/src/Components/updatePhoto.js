import React, { Component } from 'react'
import axios from 'axios'

class UpdatePhoto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      url: '',
      description: '',
      street: '',
      cross_street: ''
    }
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  onFormChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleFileUpload = async (e) => {
    this.setState({ file: e.target.files })
    const formData = new FormData();
    let photo = e.target.files[0]
    formData.append('file', photo, photo.name)
    await axios.post(`http://localhost:3001/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      this.setState({ url: response.data.Location })
    }).catch(error => {
      console.log(error)
    })
  }

  onFormSubmit = async (event) => {
    event.preventDefault()
    if (this.state.file) {
      let data = {
        id: this.props.photoId,
        image: this.state.url || this.props.url,
        description: this.state.description || this.props.description,
        street: this.state.street || this.props.street,
        cross_street: this.state.cross_street || this.props.cross_street
      }

      await fetch(`http://localhost:3001/photo/${this.props.photoId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          response.json()
        })

      this.setState({
        file: '',
        url: '',
        description: '',
        street: '',
        cross_street: ''
      })
    } else {
      let data = {
        id: this.props.photoId,
        image: this.props.url,
        description: this.state.description || this.props.description,
        street: this.state.street || this.props.street,
        cross_street: this.state.cross_street || this.props.cross_street
      }


      await fetch(`http://localhost:3001/photo/${this.props.photoId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })

      this.setState({
        file: '',
        url: '',
        description: '',
        street: '',
        cross_street: ''
      })

    }
    window.location.pathname = '/'

  }
  //functions
  render() {
    return (
      <div>

        <form className='updateform--updateInfoContain' onSubmit={this.onFormSubmit}>
          <div className='updateform--updatePhoto--url'>
            <label htmlFor='url'>Update Photo</label>
            <br />
            <input
              id='update--photoSelect'
              label='upload file'
              type='file'
              name='url'
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
              onChange={this.onFormChange}
            />
          </div>

          <div className='updateform--updateform--button'>
            <button
              id='update--infoSubmit'
              type='submit'
              value='submit'
              text='Submit Photo'>
              Update Photo</button>
          </div>

        </form>
      </div>
    )
  }
}
export default UpdatePhoto