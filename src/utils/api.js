import axios from 'axios'



export function get (url) {
  const headers = { 'Authorization': 'whatever-you-want' }
  return axios({
    method: 'get',
    url,
    headers
  })
}

export function post (url, data) {
  const headers = { 'Authorization': 'whatever-you-want' }
  return axios({
    method: 'post',
    url,
    data,
    headers
  })
}