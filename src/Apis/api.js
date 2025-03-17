import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'https://entrance-exam-lilac.vercel.app/api',
  withCredentials: true,
})

export const axiosClients = axios.create({
  baseURL: 'https://entrance-exam-lilac.vercel.app/api',
  withCredentials: true,
})
