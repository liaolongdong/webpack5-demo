import axios from 'axios'
import { getUserSetEnv } from '@/request/utils'

const baseURL = getUserSetEnv()
console.log('baseURL', baseURL)
// Set config defaults when creating the instance
const instance = axios.create({
  // baseURL: 'https://api.example.com',
  baseURL,
})

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500

export default instance
