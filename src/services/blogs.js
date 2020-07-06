import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('token in blogs', newToken)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { authorization: token },
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async (id, newObject) => {
  const req = await axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

export default { setToken, getAll, create, update }