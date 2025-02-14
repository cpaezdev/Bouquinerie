import axios from "axios"
import {config} from "../config"

//Récupération de tous les genres
export function takeAllCategories(){
    return axios.get(`${config.api_url}/api/categories/all`)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Récupération d'un genre
export function takeOneCategory(id){
    return axios.get(`${config.api_url}/api/category/${id}`)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Sauvegarde d'un genre
export function saveOneCategory(datas){
    return axios.post(`${config.api_url}/api/category/save`, datas, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Modification d'un genre
export function updateCategory(datas, id){
    return axios.put(`${config.api_url}/api/category/update/${id}`, datas, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Suppression d'un genre
export function deleteCategory(id){
    return axios.delete(`${config.api_url}/api/category/delete/${id}`, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

