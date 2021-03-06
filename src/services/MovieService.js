import axios from 'axios';
import { API_URL, headers} from './ApiConfig';
import { parse_date } from '../helpers/date';

class MovieService {
  static all(date) {
    return axios.get(API_URL + "/movies?date=" + parse_date(date), { 'headers': headers })
  }

  static create(values) {
    return axios({
      method: 'post',
      url: API_URL + "/movies" ,
      data: { "movie": values },
      headers: headers
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
