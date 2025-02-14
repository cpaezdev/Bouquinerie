import axios from "axios"
import {config} from "../config"

//Affichage de tous les messages du formulaire contact
export function takeContactMsg(){
    return axios.get(`${config.api_url}/api/contact/all`, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Affichage d'un message du formulaire contact
export function takeContactOneMsg(id){
    return axios.get(`${config.api_url}/api/contact/${id}`, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}
//Enregistrement d'un contact
export function saveContactMsg(datas){
    return axios.post(`${config.api_url}/api/contact/save`, datas)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Suppression du contact
export function deleteContactMsg(id){
    return axios.delete(`${config.api_url}/api/contact/delete/${id}`,{headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}
