import axios from 'axios';
import { parse_date } from '../helpers/date';

const API_URL = "http://localhost:3000/api/v1";
const API_KEY = "TRDFerD3SfdVJI4";

const headers = {
 headers: {
   Authorization: 'Token token=' + API_KEY 
 }
};

class MovieService {
  static all(date) {
    return axios.get(API_URL + "/movies?date=" + parse_date(date), headers)
  }

  static create(values) {
    return axios({
      method: 'post',
      url: API_URL + "/movies" ,
      data: { "movie": values },
      headers: {
        'Authorization': 'Token token=' + API_KEY
      }
    })
    .then(response => {
      if (response.status !== 200) {
        return Promise.reject(response.response);
      }
    })
    .catch(error => {
      return Promise.reject(error.response);
    })
  }
}

export default MovieService;
