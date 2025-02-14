import { useState, useEffect } from "react"
import { takeContactMsg, deleteContactMsg } from "../../../api/contact"

import { Link } from "react-router-dom"
import moment from "moment"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

const MsgContats = (props) => {

    const [messages, setMessages] = useState([])

    const deleteMessage = (userId) => {
        //Suppression d'un message
        deleteContactMsg(userId)
            .then((res) => {
                if (res.status === 200) {
                    loadMsgsList()
                }
            })
            .catch(err => console.log(err))
    }

    const loadMsgsList = () => {
        //Récupération de tous les messages
        takeContactMsg()
            .then((res) => {
                if (res.status === 200) {
                    setMessages(res.result)
                    //console.log("Msg", res.result)
                }
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        loadMsgsList()
    }, [])

    return (
        <section id="admin-contacts">
            <p><Link to="/admin">Retour</Link></p>
            <h2>Liste des messages reçus</h2>
            <article>
                <table>
                    <thead>
                        <tr>
                            <th>Mail</th>
                            <th>Object</th>
                            <th>Date de réception</th>
                            <th>Statut</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{messages.length > 0 && messages.map((msgs) => (<tr key={msgs.id}>
                        <td><Link to={`/admin/contacts/${msgs.id}`}>{msgs.email}</Link></td>
                        <td>{msgs.subject}</td>
                        <td>{moment(msgs.receipt_date).format("DD-MM-YYYY")}</td>
                        {msgs.status === 0 ? <td>non lu</td> :
                            <td>lu</td>}
                        <td><button onClick={() => deleteMessage(msgs.id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button></td>
                    </tr>)
                    )}
                    </tbody>
                </table>
            </article>
        </section>

    )
}

export default MsgContats