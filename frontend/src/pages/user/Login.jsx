import { useState } from "react"
import { useDispatch } from "react-redux"
import { modifyBasket } from "../../slices/basketSlice"
import { Link, Navigate } from "react-router-dom"
import { loginUser } from "../../api/user"
import { connectUser } from "../../slices/userSlice"

const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    // A la validation du formulaire, si ok, connexion de l'utilisateur et enregistrement du token dans le localStorage.
    const onSubmitForm = (e) => {
        e.preventDefault()
        setError(null)

        const datas = {
            email,
            password
        }

        loginUser(datas)
            .then((res) => {
                if (res.status === 200) {

                    // Stockage du token dans le localStorage
                    window.localStorage.setItem('bds-token', res.token)

                    // Création de l'objet user à pousser dans le store de redux
                    let newUser = res.user
                    newUser.token = res.token

                    // Connexion de l'utilisateur à redux
                    dispatch(connectUser(newUser))
                    setRedirect(true)

                    // Récupération du panier spécifique à cet utilisateur dans le localStorage
                    const userBasket = JSON.parse(window.localStorage.getItem(`bds-basket-${newUser.id}`))

                    if (userBasket) {
                        // Si un panier existe pour cet utilisateur, on met à jour le store Redux
                        dispatch(modifyBasket(userBasket))
                    } else {
                        // Si aucun panier spécifique n'existe, on utilise le panier global
                        const globalBasket = JSON.parse(window.localStorage.getItem("bds-basket"))
                        if (globalBasket) {
                            // Sauvegarder le panier global comme panier spécifique à l'utilisateur
                            window.localStorage.setItem(`bds-basket-${newUser.id}`, JSON.stringify(globalBasket))
                            dispatch(modifyBasket(globalBasket))
                        }
                    }

                    // Supprimer le panier global après la connexion
                    window.localStorage.removeItem("bds-basket")

                } else {
                    setError(res.msg)
                }
            })
            .catch(err => console.log(err))
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <section id="login" className="container">
            <h2>Identifiez-vous</h2>
            <article>
                <h3>Se connecter</h3>
                {error !== null && <p>{error}</p>}
                <form onSubmit={onSubmitForm}>
                    <label htmlFor="email">Votre mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        required
                    />
                    <label htmlFor="current-password">Votre mot de passe</label>
                    <input
                        type="password"
                        id="current-password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        required
                    />
                    <input type="submit" value="Se connecter" aria-label="Bouton pour se connecter à votre compte" />
                </form>
            </article>
            <article>
                <h3>Pas encore de compte ?</h3>
                <p>S'inscrire</p>
                <button><Link to="/register">Je crée mon compte</Link></button>
            </article>
        </section>
    )
}

export default Login  
