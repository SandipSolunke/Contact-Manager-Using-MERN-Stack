import axios from 'axios';


export default axios.create({
    baseURL:"https://contact-manager-backend-server.herokuapp.com/api/contacts"
});

