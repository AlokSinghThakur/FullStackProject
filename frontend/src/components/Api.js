import axios from 'axios';
import env from 'react-dotenv';


export default axios.create({
    baseURL:`https://backend-paen.onrender.com`
});