import { checkMyToken } from "../api/user"
import { Navigate, useParams } from "react-router-dom"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
//Import des actions
import { selectUser, connectUser } from "../slices/userSlice"
import { selectBooks, loadBooks } from "../slices/bookSlice"

//Appel de la fonction api pour récupérer tous les livres
import { takeAllBooks } from "../api/book"

//Composant d'ordre supérieur : HOC de contrôle des datas et de la sécurité des routes
const RequireAuth = (props) => {

    //Récupération des params de la route
    const params = useParams()

    //Récupération dans le store des states globales user et book 
    const user = useSelector(selectUser)
    const allbooks = useSelector(selectBooks)

    //Préparation de la fonctionnalité pour dispatcher notre action dans le store de redux
    const dispatch = useDispatch()

    //Récupération du composant à afficher, passé en tant que props
    const Child = props.child

    //Gestion de la redirection
    const [redirect, setRedirect] = useState(false)
    const [redirectAdmin, setRedirectAdmin] = useState(false)

    //Quand les props du composant sont chargées
    useEffect(() => {

        //Si les livres ne sont pas chargés dans redux, on les charges
        if (allbooks.books.length === 0) {
            takeAllBooks()
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(loadBooks(res.result))
                    }
                })
                .catch(err => console.log(err))
        }

        //Test de connection via les infos de redux
        if (user.isLogged === false) {
            const token = window.localStorage.getItem('bds-token')
            //Si le storage répond nul (ne trouve pas le token) et que la props est true (route protégée)
            if (token === null && props.auth) {
                //Accès à la route refusé
                setRedirect(true)
            } else {
                if (token !== null) {
                    //Appel de la requête ajax qui va vérifier le token dans le back
                    checkMyToken()
                        .then((res) => {
                            if (res.status !== 200) {
                                if (props.auth) {
                                    setRedirect(true)
                                }
                            } else {
                                //On stocke la réponse de la requête
                                let myUser = res.user
                                //Rajout du token à l'objet
                                myUser.token = token
                                //On demande la connexion dans le store de redux
                                dispatch(connectUser(myUser))
                                //Vérification: si la route demandée est admin alors status doit admin, si différent redirection 
                                if (myUser.status !== 'admin' && props.admin) {
                                    setRedirectAdmin(true)
                                }
                            }
                        })
                        .catch(err => console.log(err))
                }
            }
        }
    }, [props])

    if(redirect){
        return <Navigate to="/login" />
    }
    if(redirectAdmin){
        return <Navigate to="/" />
    }
    return (<Child {...props} params={params} />)
}

export default RequireAuth
