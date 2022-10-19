import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://api.ibroadcast.com'
})

export const libraryClient = axios.create({
  baseURL: 'http://library.ibroadcast.com'
})
