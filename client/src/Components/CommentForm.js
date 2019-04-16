import React, {Component} from 'react'

class Comment extends Component{
    constructor(props){
        super(props)
        this.state={
            comment: '',
        }
        //bind functions
        this.onFormChange=this.onFormChange.bind(this)
        this.onFormSubmit=this.onFormSubmit.bind(this)
        this.getComments=this.getComments.bind(this)
    }

    onFormChange=event=>{
        const{name,value}=event.target
        this.setState({
          [name]:value,
        }) 
        console.log('onformchange', this.state.comment)
      }

    onFormSubmit= async (event)=>{
      event.preventDefault()

      let data = {
        comment: this.state.comment
      }
    
      console.log('data', data)
    
      await fetch(`http://localhost:3001/comments/${this.props.photoid}`, {
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

    getComments = async (photoid, index)=>{
      const {photos} = this.props
        photos.photoid.forEach((photo)=>{
          if (photos.id === photoid) {
            const photoCommentsArray = [...this.state.comment]
            this.setState({comment: photoCommentsArray})
          }
        })
      // return photos.map((photo)=>
      //     <div key = {this.props.photoid}>
      //       <div>{photo.comment}</div>
      //     </div>      
    }

    componentDidMount = () => {
      this.getComments()
    }
//in return wrap everything in div
// in div but above form placeholder dive

    render(){
        return(

            <form onSubmit={this.onFormSubmit}>
                <div className='comment--commentForm--commentInput'>
                    <label htmlFor='comment'>Comment</label>
                    <br />
                    <input
                        id='commentupload'
                        name='comment'
                        type='string'
                        value={this.state.value}
                        onChange={this.onFormChange}
                    />
                </div>  
                <div>
                  <button
                    id='photoSubmit'
                    type='submit'
                    value='submit'
                    text='Submit Photo'>
                    Submit Comment
                    </button>
                </div>  
            </form>
        )
    }
}
export default Comment

