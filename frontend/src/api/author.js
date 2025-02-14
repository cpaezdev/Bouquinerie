import axios from "axios"
import { config } from "../config"

//Récupération de tous les auteurs
export function allAuthors() {
    return axios.get(`${config.api_url}/api/authors/all`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        })
}
//Récupération d un auteur
export function oneAuthor(id) {
    return axios.get(`${config.api_url}/api/author/${id}`)
        .then((res) => {
            return res.data    
        })
        .catch((err) => {
            return err
        })
}

//Enregistrer un auteur
export function saveAuthor(datas){
    return axios.post(`${config.api_url}/api/author/save`, datas, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err
    })
}

//Modifier un auteur
export function updateAuthor(datas, id){
    return axios.put(`${config.api_url}/api/author/update/${id}`, datas, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err
    })
}

//Supprimer un auteur
export function deleteAuthor(id){
    return axios.delete(`${config.api_url}/api/author/delete/${id}`, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err
    })
}

//AUTHORS_BOOKS

//Sauvegarde d un auteur d un livre
export function saveAuthorsBook(datas){
    return axios.post(`${config.api_url}/api/authorbook/save`, datas, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err
    })
}

//Suppression de l association livre-auteur
export function deleteAuthorBook(booksId){
    return axios.delete(`${config.api_url}/api/authorbook/delete/${booksId}`, {headers: {'x-access-token': window.localStorage.getItem('bds-token')}})
    .then((res) => {
        //console.log("Auteurs d'un livre",res)
        return res.data
    })
    .catch((err) => {
        return err
    })
}
