import axios from "axios"
import {config} from "../config"

//Récupération de tous les livres
export function takeAllBooks(){
    return axios.get(`${config.api_url}/api/books/all`)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Récupération d'un livre
export function takeOneBook(id){
    return axios.get(`${config.api_url}/api/book/${id}`)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Récupération des 4 derniers livres rentrés
export function takeLastBooks(){
    return axios.get(`${config.api_url}/api/books/lastbooks`)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Récupération de tous les livres par genre
export function AllBooksOneCat(id){
    return axios.get(`${config.api_url}/api/books/categorie/${id}`)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Récupération de tous les livres par état
export function allBooksOneCond(id){
    return axios.get(`${config.api_url}/api/books/condition/${id}`)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Récupération de tous les livres par auteur
export function allBooksByAuthor(id){
    return axios.get(`${config.api_url}/api/booksauthor/${id}`)
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Récupération de tous les auteurs d'un livre
export function allAuthorsByBook(id){
    return axios.get(`${config.api_url}/api/authorsbook/${id}`)
    .then((res)=> {
        return res.data
        console.log(res.data)
    })
    .catch((err)=>{
        return err
    })
}

//Ajout d'un livre
export function addOneBook(datas){
    return axios.post(`${config.api_url}/api/book/save`, datas, {headers:{"x-access-token": window.localStorage.getItem('bds-token') }})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Modification d'un livre
export function updateBook(datas, id){
    return axios.put(`${config.api_url}/api/book/update/${id}`, datas, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
       // console.log("updateBook",res)
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Suppression d'un livre
export function deleteBook(id){
    return axios.delete(`${config.api_url}/api/book/delete/${id}`, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res)=> {
        return res.data
    })
    .catch((err)=>{
        return err
    })
}
