import axios from 'axios'
import { GET_HOTELS, GET_HOTELS_REJECTED } from '@Constants'

const getHotels = () => {
  return function (dispatch) {
    axios.get('/api/hotels').then(function (response) {
      dispatch({type: GET_HOTELS, payload: response.data})
    }).catch(function (err) {
      dispatch({type: GET_HOTELS_REJECTED, payload: err})
    })
  }
}

export { getHotels }
