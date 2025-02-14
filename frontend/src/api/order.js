import axios from "axios"
import {config} from "../config"

//Récupération de toutes les commandes
export function takeAllOrders(){
    return axios.get(`${config.api_url}/api/orders/all`, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Recupération d'une commande
export function takeOneOrder(id){
    return axios.get(`${config.api_url}/api/order/${id}`, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Récupération de toutes les commandes d'un utilisateur
export function takeAllOrdersByUser(id){
    return axios.get(`${config.api_url}/api/orders/user/${id}`, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Recupération d'une commande par un utilisateur
export function takeOneOrderUser(id){
    return axios.get(`${config.api_url}/api/user/order/${id}`, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Sauvegarde d'une commande
export function saveOneOrder(datas){
    return axios.post(`${config.api_url}/api/order/save`, datas, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Gestion du paiement (va analyser le bon fonctionnement du paiement)
export function checkPayment(datas){
    return axios.post(`${config.api_url}/api/order/payment`, datas, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Modification du status de la commande
export function updatePaymentStatus(datas){
    return axios.put(`${config.api_url}/api/order/updatePaymentStatus`, datas, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}


