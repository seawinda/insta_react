import React, {Component} from 'react';
import InstaService from '../services/instaService';
import ErrorMessage from './Error';

export default class Palette extends Component {
    InstaService = new InstaService();
    state = {
        error: false,
        photos: [],
        loading: true,
    }

    componentDidMount() {
        this.apdatePhotos();
    }

    apdatePhotos() {
        this.InstaService.getAllPosts()
            .then(this.onPhotosLoaded)
            .catch(this.onError)
    }

    onError = () => {
        this.setState({
            error: true
        })
    }

    onPhotosLoaded = (photos) => {
        this.setState({
            error: false,
            photos,
            loading: false
        })
    }

    renderItems(arr) {
        return arr.map(item => {
            const {src, alt, id} = item;

            return (
                <img key={id} src={src} alt={alt}></img>
            )
        });
    }
    
    render() {
        const {error, photos} = this.state;
        if(error) {
            return <ErrorMessage/>
        }

        const items = this.renderItems(photos);

        return (
            <div className="palette">
                {items}
            </div>
        );
    }

}

