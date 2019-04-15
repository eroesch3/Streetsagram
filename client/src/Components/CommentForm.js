import React, {Component} from 'react'

class Comment extends Component{
    constructor(props){
        super(props)
        this.state={
            comment: '',
        }
        //bind functions
    }

    onFormChange=event=>{
        const{name,value}=event.target
        this.setState({
          [name]:value,
        })
      }

    onFormSubmit= async (event)=>{
      event.preventDefault()

      let data = {
        comment: this.state.comment
      }
    
      console.log('data', data)
    
      await fetch(`/comments/${this.props.id}`, {
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
        comment:'',
      })
    }


    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <div className='comment--commentForm--commentInput'>
                    <label htmlFor='description'>Comment</label>
                    <br />
                    <input
                        name='comment'
                        type='string'
                        value={this.state.value}
                        onChange={this.onFormChange}
                    />
                </div>  
            </form>
        )
    }
}
export default Comment