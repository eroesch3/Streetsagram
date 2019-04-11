import ImageUploader from 'react-images-upload';
import React, {Component} from 'react'

class Feed extends Component {
    constructor(props){
        super(props) 
        this.state={
            pictures: []
        }
        this.onDrop=this.onDrop.bind(this)
    }
    
    onDrop(picture) {
        this.setState({pictures: this.state.pictures.concat(picture)})
    }

    render(){

        return(
            <div className='feed--divContainer'>
                <ImageUploader 
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.png']}
                    maxFileSize={5242880}
                />
            </div>
        )
    }
}

export default Feed
