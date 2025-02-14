import { useState, useEffect } from "react"
import { deleteUser, takeAllUsers } from "../../../api/user"

import { Link } from "react-router-dom"   
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'   
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'   

const UsersAdmin = (props) => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)   
    const [successMessage, setSuccessMessage] = useState(null)

    //------SUPPRESSION D'UN UTILISATEUR ------//
    const deleteOneUser = (userId) => {
        deleteUser(userId)
            .then((res) => {
                if (res.status === 200) {
                    loadUsersList()
                    setSuccessMessage("L'utilisateur a bien été supprimé.")
                } else {
                    setError("Erreur lors de la suppression de l'utilisateur")
                }
            })
            .catch(err => console.log(err))
    }

    //------CHARGEMENT DE TOUS LES UTILISATEURS ------//
    const loadUsersList = () => {
        //Récupération de tous les utilisateurs
        takeAllUsers()
            .then((res) => {
                if (res.status === 200) {
                    setUsers(res.result)
                    //console.log("All Users", res.result)
                }
            })
            .catch(err => console.log(err))
    }   

    useEffect(() => {
        loadUsersList()

    }, [])

    return (<section id="admin-users">
        <p><Link to="/admin">Retour</Link></p>
        <h2>Listes des utilisateurs</h2>
        {error !== null && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <article>
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Mail</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 && users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.lastname}</td>
                        <td>{user.firstname}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => deleteOneUser(user.id)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </article>
    </section>)
}

export default UsersAdmin