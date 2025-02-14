import { useState, useEffect } from "react"
import { takeContactOneMsg } from "../../../api/contact"
import { Link } from "react-router-dom"
import moment from "moment"

const Message = (props) => {

    const [message, setMessage] = useState(null)   

    useEffect(() => {
        //Récupération du message. Quand l'admin ouvre le message, le statut du message passe de non lu à lu (cf.contactController.js)
        takeContactOneMsg(props.params.id)
            .then((res) => {
                if (res.status === 200) {
                    setMessage(res.result)
                    //console.log("Message", res.result)
                }
            })
            .catch(err => console.log(err))
    }, [props.params.id])

    return (<section id="admin-message" className="container">
        <p><Link to="/admin/contacts">Retour à la liste des messages</Link></p>
        <h2>Message n°{props.params.id}</h2>
        {message !== null && (<article>
            <p><strong>Recu le</strong> {moment(message.receipt_date).format("DD-MM-YYYY")}</p>
            <p><strong>Envoyé par </strong><Link to="mail de l'administrateur">{message.email}</Link></p>
            <p><strong>Objet du mail:</strong> {message.subject}</p>
          <div>  <p><strong>Message:</strong></p>
            <p>{message.story}</p></div>
        </article>)}
    </section>)
}

export default Message