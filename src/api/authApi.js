import axios from 'axios';

export default axios.create({
    baseURL:'https://cgm-api-server.herokuapp.com'
});
