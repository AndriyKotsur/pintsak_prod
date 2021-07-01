import {
  SEND_REQUEST_SUCCESS,
  SEND_REQUEST_ERROR,
  SEND_REQUEST_LOADING,
  CHANGE_STATE,
  CLEAR_STATE
} from '../constants/send-request'

import {
  HTTP,
} from 'helpers'

export const sendRequest = ({ request }) => {
  return async dispatch => {
    dispatch({
      type: SEND_REQUEST_LOADING,
    })

    try {
      if(request) await HTTP.sendRequest({
        ...request
      })

      return dispatch({
        type: SEND_REQUEST_SUCCESS
      })
    } catch (err) {
      console.error(err)
      return dispatch({
        type: SEND_REQUEST_ERROR
      })
    }
  }
}

export const handleChange = (event) => {
  return dispatch => {
    dispatch({
      type: CHANGE_STATE,
      payload: event
    })
  }
}