import axios from "axios"
import {config} from "../config"

//Récupération de toutes les états des livres
export function takeAllConditions(){
    return axios.get(`${config.api_url}/api/conditions/all`)
    .then((res)=> {
        return res.data
    })  
    .catch((err)=>{
        return err
    })
}

//Récupération d'un état
export function takeOneCondition(id){
    return axios.get(`${config.api_url}/api/condition/${id}`)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Sauvegarde d'un état
export function saveOneCondition(datas){
    return axios.post(`${config.api_url}/api/condition/save`, datas, {headers:{"x-access-token": window.localStorage.getItem('bds-token') }})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Modification d'un état
export function updateCondition(datas, id){
    return axios.put(`${config.api_url}/api/condition/update/${id}`, datas, {headers:{"x-access-token": window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Suppression d'un état
export function deleteCondition(id){
    return axios.delete(`${config.api_url}/api/condition/delete/${id}`, {headers:{"x-access-token": window.localStorage.getItem('bds-token') }})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

