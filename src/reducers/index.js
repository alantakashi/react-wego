import { combineReducers } from 'redux'
import HotelReducer from './HotelReducer'

export default combineReducers({
  hotels: HotelReducer
})
