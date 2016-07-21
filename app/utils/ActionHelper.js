import { API_ROOT } from 'config'
import React from 'react'
import ReactDOM from 'react-dom'
import TokenError from '../Common/components/TokenError'

export const action = (type, payload = {}) => {
  return { type, ...payload }
}

export const restAction = {
  HEAD: (endpoint, data, isSafe = true) => createRestAction('HEAD', endpoint, data, isSafe),
  OPTIONS: (endpoint, data, isSafe = true) => createRestAction('OPTIONS', endpoint, data, isSafe),
  GET: (endpoint, data, isSafe = true) => createRestAction('GET', endpoint, data, isSafe),
  PUT: (endpoint, data, isSafe = true) => createRestAction('PUT', endpoint, data, isSafe),
  PATCH: (endpoint, data, isSafe = true) => createRestAction('PATCH', endpoint, data, isSafe),
  POST: (endpoint, data, isSafe = true) => createRestAction('POST', endpoint, data, isSafe),
  DELETE: (endpoint, data, isSafe = true) => createRestAction('DELETE', endpoint, data, isSafe)
}

export const thunkAction = {
  HEAD: (flow, endpoint, param, isSafe = true) => createThunkAction('HEAD', flow, endpoint, param, isSafe),
  OPTIONS: (flow, endpoint, param, isSafe = true) => createThunkAction('OPTIONS', flow, endpoint, param, isSafe),
  GET: (flow, endpoint, param, isSafe = true) => createThunkAction('GET', flow, endpoint, param, isSafe),
  PUT: (flow, endpoint, param, isSafe = true) => createThunkAction('PUT', flow, endpoint, param, isSafe),
  PATCH: (flow, endpoint, param, isSafe = true) => createThunkAction('PATCH', flow, endpoint, param, isSafe),
  POST: (flow, endpoint, param, isSafe = true) => createThunkAction('POST', flow, endpoint, param, isSafe),
  DELETE: (flow, endpoint, param, isSafe = true) => createThunkAction('DELETE', flow, endpoint, param, isSafe)
}

function createRestAction(method, endpoint, data, isSafe = true) {
  const fullUrl = `${API_ROOT}${endpoint}`
  let option = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (data) {
    option['body'] = JSON.stringify(data)
  }
  if (isSafe) {
    let ACCESS_TOKEN = localStorage.getItem('accessToken')

    if (ACCESS_TOKEN) {
      option.headers['X-Auth-Token'] = ACCESS_TOKEN
    }
  }
  return fetch(fullUrl, option)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response)
      }
      return response
    })
}

function createThunkAction(method, flow, endpoint, param, isSafe = true) {
  const fullUrl = `${API_ROOT}${endpoint}`
  let ACCESS_TOKEN = localStorage.getItem('accessToken')
  let option = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {}
  }
  if (ACCESS_TOKEN && isSafe) {
    option.headers["X-Auth-Token"] = ACCESS_TOKEN
  }
  if (param) {
    option.body = JSON.stringify(param.data)
  }
  return (dispatch, getState) => {
    dispatch(flow.request())
    return fetch(fullUrl, option)
      .then(response => {
        if (response.status === 204) {
          return response.text().then(text => ({ text, response }))
        } else {
          return response.json().then(json => ({ json, response }))
        }
      }
      ).then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        dispatch(flow.success({
          actionType: param.actionType,
          result: json,
          maxResults: response.headers.get('X-Content-Record-Total') || 0,
          dataExists:response.headers.get('X-Content-System-User'),
        }))
      })
      .catch(
      error => {
        if (error.message.indexOf('Token') >= 0 || (isSafe && !ACCESS_TOKEN)) {
          ReactDOM.render(<TokenError />, document.getElementById('error'))
        }
        dispatch(flow.failure({
          actionType: param.actionType,
          error: error
        }))
      }
      )
  }
}