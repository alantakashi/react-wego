import { GET_HOTELS } from '@Constants'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
  console.log('action', action)
  switch (action.type) {
    case GET_HOTELS:
      return {...state, hotels: action.payload}

    default:
      return state
  }
}
