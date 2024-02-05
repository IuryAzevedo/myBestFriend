import axios from "axios";

const api = axios.create({
    baseURL: 'http://172.18.9.125:3334'
})

// IP computador vortex
// http://172.18.9.125:3334
export {api}