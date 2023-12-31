import axios from 'axios'
const baseUrl = '/api/login'

const loginService = async (credentials) => {
  try {
    const request = await axios.post(baseUrl, credentials).then(response => response.data)
    return request
  } catch (error) {
    console.log(error.message)
  }
}

export default loginService
