import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

class Label extends React.Component {
  render() {
    if (this.props.hasLabel === 'true') {
      return <label 
        htmlFor={this.props.htmlFor}>
        {this.props.label}
      </label>
    }
  }
}

class Button extends Component {
  render() {
    return (
      <fieldset>
        <button
          type={this.props.type || 'button'}
          value={this.props.value || null}
        >
          {this.props.text}
        </button>
      </fieldset>
    );
  }
};

class Input extends Component {
  render() {
    return (
      <fieldset>
        <Label
          hasLabel={this.props.hasLabel}
          htmlFor={this.props.htmlFor}
          label={this.props.label}
        />
        <br />
        <input
          id={this.props.htmlFor}
          name={this.props.name || null}
          placeholder={this.props.placeholder || null}
          type={this.props.type || 'text'}
        />
      </fieldset>
    );
  }
}

class Textarea extends Component {
  render() {
    return (
      <fieldset>
        <Label
          hasLabel={this.props.hasLabel}
          htmlFor={this.props.htmlFor}
          label={this.props.label}
        />
        <br />
        <textarea
          id={this.props.htmlFor}
          name={this.props.name || null}
        >
        </textarea>
      </fieldset>
    );
  }
};

class Street extends Component {
  render() {
    return (
      <fieldset>
        <Label
          hasLabel={this.props.hasLabel}
          htmlFor={this.props.htmlFor}
          label={this.props.label}
        />
        <br />
        <textarea
          id={this.props.htmlFor}
          name={this.props.name || null}
        >
        </textarea>
      </fieldset>
    );
  }
};

class CrossStreet extends Component {
  render() {
    return (
      <div>
        <Label
          hasLabel={this.props.hasLabel}
          htmlFor={this.props.htmlFor}
          label={this.props.label}
        />
        <br />
        <textarea
          id={this.props.htmlFor}
          name={this.props.name || null}
        >
        </textarea>
      </div>
    );
  }
};

export default class Form extends Component {
  constructor(){
    super()
      this.state={
        url: '',
        description:'',
        street: '',
        cross_street: ''
      }
  }

onFormSubmit=event=>{
  event.preventDefault()
  let data = {
    url: this.state.url,
    description: this.state.description,
    street: this.state.street,
    cross_street: this.state.cross_street
  }
  fetch('http://localhost:3000/photos/:user_id', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response=>{
    return response.json()
  })
  this.setState({
    url: '',
    description:'',
    street: '',
    cross_street: ''
  })
}

  changeHandler = event => {
    this.setState({
      url: event.target.value
    })
  }

  render() {
    return (
      <form method='' action=''>
        <Input
          hasLabel='true'
          htmlFor='photourl'
          label='Photo Url '
          required='true'
          type='url'
        />

        <Textarea
          hasLabel='true'
          htmlFor='textarea'
          label='Photo Description ' 
          required='true'
          type='string'
        />

        <Street 
          hasLabel='true'
          htmlFor='street'
          label='Street Location'
          type='string'
        />

        <CrossStreet
          hasLabel='true'
          htmlFor='crossstreet'
          label='Photo Cross-Street location'
          type='string' 
        />   
        
        <Button
          type='submit'
          value='submit'
          text='Submit Photo'
        />
      </form>
    )
  }
}



