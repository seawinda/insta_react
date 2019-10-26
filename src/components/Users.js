import React, {Component} from 'react';
import InstaService from '../services/instaService';
import User from './User';
import ErrorMessage from './Error';

export default class Users extends Component {    
    InstaService = new InstaService();
    state = {
        users: [],
        error: false,
    }

    componentDidMount() {
        this.updateUsers();
    }

    updateUsers() {
        this.InstaService.getAllUsers()
        .then(this.onUsersLoaded)
        .catch(this.onError);
    }
    
    onUsersLoaded = (users) => {
        this.setState({
            users,
            error: false,
        });
        console.log(this.state.users)
    }

    onError = () => {
        this.setState({
            error: true,
        });
    }

    renderItems(arr) {
        return arr.map(item => {
            const {name, altname, photo, id} = item;

            return (
                
                    <User key={id} src={photo} 
                    alt={altname}
                    name={name} 
                    min />                        
               
            )
        });
    }    

    render() {
        const {error, users} = this.state;

        if(error) {
            return <ErrorMessage/>
        }

        

        
        const items = this.renderItems(users);
        return (
            <div className="right">
                <User src="data:image/jpeg;base64,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" 
                        alt="man"
                        name="Ванятка"  />
                <div className="users__block">
                    {items}
                </div>

            </div>
        );
    }
    
}