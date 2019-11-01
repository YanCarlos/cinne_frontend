import axios from 'axios';
import { API_URL, headers} from './ApiConfig';
import { parse_date } from '../helpers/date';


class BookingService {
  static all(date) {
    return axios.get(API_URL + "/schedules/bookings?date=" + parse_date(date), { 'headers': headers })
  }

  static create(values, schedule_id) {
    return axios({
      method: 'post',
      url: API_URL + "/schedules/" + schedule_id + "/bookings",
      data: { "booking": values },
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

export default BookingService;
