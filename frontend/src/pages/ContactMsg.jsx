import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { saveContactMsg } from "../api/contact"

const ContactMsg = (props) => {

    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [story, setStory] = useState("")
    const [error, setError] = useState("")
    const [redirect, setRedirect] = useState(false)

    //Fonction de demande d'enregistrement du message
    const msgContact = (datas) => {
        saveContactMsg(datas)
            .then((res) => {
                if (res.status === 200) {
                    setError(null)
                    setRedirect(true)

                } else {
                    setError("Votre message n'a pas pu être envoyé.")
                }
            })
            .catch(err => console.log(err))
    }

    //Lorsque l on soumet le formulaire
    const onSubmitFormContact = (e) => {
        e.preventDefault()
        setError(null)

        const datas = {
            email: email,
            subject: subject,
            story: story
        }
        if (email === "" || subject === "" || story === "") {
            setError("Veuillez remplir les champs vides")
        } else {
            msgContact(datas)
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }
    
    return (<section id="contact" className="container">
        <p><Link to="/">Retour à la page d'accueil</Link></p>
        <h2>Nous contacter</h2>
        
        {error !== null && <p className="error">{error}</p>}
        <form onSubmit={onSubmitFormContact}>

        <input type="email"
        placeholder="Votre mail"
        value={email}
        onChange={(e)=>{
            setEmail(e.currentTarget.value)
        }}
        />
        <input type="text"
        placeholder="Sujet du message"
        value={subject}
        onChange={(e)=>{
            setSubject(e.currentTarget.value)
        }}
        />
        <textarea name="Message"
        placeholder="Votre message"
        onChange={(e)=>
            setStory(e.currentTarget.value)}
        ></textarea>
        <input type="submit" value="Envoyer" />
        </form>

    </section>)
}

export default ContactMsg