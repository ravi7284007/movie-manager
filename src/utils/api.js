// src/utils/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://movie-search-manager.netlify.app/'
});

export default API;
