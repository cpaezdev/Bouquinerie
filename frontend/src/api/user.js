import axios from "axios"
import {config} from "../config"

export function addOneUser(datas) {
    return axios.post(`${config.api_url}/api/user/save`, datas)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function loginUser(datas) {
    return axios.post(`${config.api_url}/api/user/login`, datas)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function updateProfil(datas, id) {
    return axios.put(`${config.api_url}/api/user/update/${id}`, datas, { headers: { "x-access-token": window.localStorage.getItem('bds-token') } })
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function deleteUser(id) {
    return axios.delete(`${config.api_url}/api/user/delete/${id}`, {headers : {"x-access-token" : window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function checkMyToken() {
    return axios.get(`${config.api_url}/api/user/checkToken`, { headers: {"x-access-token" : window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function takeAllUsers() {
    return axios.get(`${config.api_url}/api/users/all`, { headers: {"x-access-token" : window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}
