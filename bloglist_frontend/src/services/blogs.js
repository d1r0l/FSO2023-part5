import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl).then(response => response.data)
  return request
}

const createNew = async (newBlog, token) => {
  const request = await axios
    .post(baseUrl, newBlog, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response.data)
  return request
}

export default { getAll, createNew }
