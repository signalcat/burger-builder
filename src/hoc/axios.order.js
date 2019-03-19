import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-f8d88.firebaseio.com/'
});

export default instance;