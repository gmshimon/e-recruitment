/* eslint-disable no-unused-vars */
import axios from "axios"; 

const local = 'http://localhost:5000/api/v1/'

const instance = axios.create({
  baseURL : local,
});

export default instance;