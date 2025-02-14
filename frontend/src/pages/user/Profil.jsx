import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, connectUser, logoutUser } from "../../slices/userSlice"
import { updateProfil, deleteUser } from "../../api/user"
import { Link, useNavigate } from "react-router-dom"
import { takeAllOrdersByUser } from "../../api/order"
import moment from "moment"

const Profil = (props) => {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [address, setAddress] = useState("")
    const [complementAddress, setComplementAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")

    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const [orders, setOrders] = useState([])

    //Suppression de compte d'un utilisateur (par son id)
    const removeUser = (e) => {
        e.preventDefault()
        deleteUser(user.infos.id)
            .then((res) => {
                if (res.status === 200) {
                    //Suppression du token dans le localStorage
                    window.localStorage.removeItem('bds-token')
                    //Demande de déconnexion au store de redux
                    dispatch(logoutUser())
                    //redirection
                    navigate("/")
                }
                else {
                    setError("Votre compte n'a pas pu être supprimé")
                }
            })
            .catch(err => console.log(err))
    }

    //Formulaire de Modification (addresse + telephone)
    const onSubmitForm = (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        const datas = {
            address: address,
            complement_address: complementAddress,
            zip: zip,
            city: city,
            phone: phone
        }

        //Modification du profil avec datas et user.infos.id
        updateProfil(datas, user.infos.id)
            .then((res) => {
                if (res.status !== 200) {
                    setError("Erreur lors de la modification")
                }
                else {
                    /*L'utilisateur doit être mis à jour dans redux:
                    1- on récupère le token dans le localStorage.
                    */
                    const token = window.localStorage.getItem('bds-token')
                    if (res.newUser) {
                        //2- On récupère les infos de l'utilisateur mis à jour par la requête ajax.
                        let newUser = res.newUser
                        newUser.token = token
                        //3- on met à jour le store de redux
                        dispatch(connectUser(newUser))
                    }
                    setSuccess(res.msg)
                }
            })
            .catch(err => console.log(err))
    }

    
    useEffect(() => {
        
        setAddress(user.infos.address)
        setComplementAddress(user.infos.complement_address)
        setZip(user.infos.zip)
        setCity(user.infos.city)
        setPhone(user.infos.phone)
        
        //Affichage de toutes les commandes de l'utilisateur par son id
        takeAllOrdersByUser(user.infos.id)
            .then((res) => {
                if (res.status === 200) {
                    setOrders(res.result);
                }
            })
            .catch((err) => console.log(err));
    }, [user])

    return (<section id="profil" className="container">
        <h2>{user.infos.firstname} {user.infos.lastname}</h2>
        <p>{user.infos.email}</p>

        <article>
            <h3>Données personnelles</h3>
            {error !== null && <p className="error">{error}</p>}
            {success !== null && <p className="success">{success}</p>}
            <form onSubmit={onSubmitForm}>
                <label htmlFor="address">Votre adresse</label>
                <input type="text"
                    id="address"
                    defaultValue={user.infos.address}
                    onChange={(e) => {
                        setAddress(e.currentTarget.value)
                    }}
                />
                <label htmlFor="complement">Complément d'adresse</label>
                <input type="text"
                    id="complement"
                    defaultValue={user.infos.complement_address}
                    onChange={(e) => {
                        setComplementAddress(e.currentTarget.value)
                    }}
                />
                <label htmlFor="zip">Votre code postal</label>
                <input type="text"
                    id="zip"
                    defaultValue={user.infos.zip}
                    onChange={(e) => {
                        setZip(e.currentTarget.value)
                    }}
                />
                <label htmlFor="city">Votre ville</label>
                <input type="text"
                    id="city"
                    defaultValue={user.infos.city}
                    onChange={(e) => {
                        setCity(e.currentTarget.value)
                    }}
                />
                <label htmlFor="phone">Votre numéro de téléphone</label>
                <input type="text"
                    id="phone"
                    defaultValue={user.infos.phone}
                    onChange={(e) => {
                        setPhone(e.currentTarget.value)
                    }}
                />
                <input type="submit" value="Modifier" aria-label="Modifier vos données personnelles" />
            </form>
        </article>
        <article>
            <h3>Historique de vos commandes</h3>

            <table >
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Date</th>
                        <th>Montant total</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? orders.map((o) => (
                        <tr key={o.id}>
                         <td>
                        {/* Condition sur le statut de la commande*/}
                        {o.status === "non payée" ? (
                        <Link to={`/ordervalidate/${o.id}`}>{o.id}</Link>
                        ) : (
                           <Link to={`/user/orderDetail/${o.id}`}>{o.id}</Link>
                           )}
                           </td>
                            <td>{moment(o.date).format("DD-MM-YYYY")}</td>
                            <td>{o.total_amount} €</td>
                            <td>{o.status}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={4}>Vous n'avez effectué aucune commande.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <p>
                <a onClick={removeUser}>Supprimer le compte</a>
            </p>
        </article>
    </section>)
}

export default Profil
