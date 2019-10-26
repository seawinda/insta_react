export default class InstaService {
    constructor() {
        this._apiBase = 'http://localhost:3000';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}; received ${res.status}`);
        }

        return await res.json();
    }

    getAllPosts = async () => {
        const res = await this.getResource('/posts/');
        return res;
    }
    

    getAllPhotos = async () => {        
        const res = await this.getResource('/posts/');
        return res.map(this._transformPosts);
    }

    getAllUsers = async () => {
        const res = await this.getResource('/users/');
        return res.map(this._transformUsers);
        //return res;
    }

    _transformPosts = (post) => {
        
        return {
            id: post.id,
            src: post.src,
            alt: post.alt
        }
    }
    _transformUsers = (post) => {
        return {
            id: post.id,
            name: post.name,
            altname: post.altname,
            photo: post.photo,
        }
    }
}