import { useState } from "react"
import { Navigate } from "react-router-dom"
import { addOneUser } from "../../api/user"
import { validateInputField } from "../../helpers/formValidator"

const Register = (props) => {

const [lastname, setLastname] = useState("")
const [firstname, setFirstname] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [address, setAddress] = useState("")
const [complementAddress, setComplementAddress] = useState("")
const [zip, setZip] = useState("")
const [city, setCity] = useState("")
const [phone, setPhone] = useState("")

const [redirect, setRedirect] = useState(false)
const [error, setError] = useState(null)

//Au click, on vérifie les données envoyées du formulaire 
const onSubmitForm = (e) => {
    e.preventDefault()

    //On passe la state error à null
    setError(null)

    //Appel de la fonction de validation du formulaire pour chaque champ.
    let lastnError = validateInputField("nom", "lastname", lastname)
    if(lastnError !== true){
        setError(lastnError)
        return //on retourne pour sortir de la fonction
    }

    let firstnError = validateInputField("prénom", "firstname", firstname)
    if(firstnError !== true){
        setError(firstnError)
        return
    }

    let emailError = validateInputField("mail", "email", email)
    if(emailError !== true){
        setError(emailError)
        return
    }

    let passError = validateInputField("mot de passe", "password", password)
    if(passError !== true){
        setError(passError)
            return
    }

    let addressError = validateInputField("adresse", "address", address)
    if(addressError !== true){
        setError(addressError)
        return
    }
    
    let zipError = validateInputField("code postal", "zip", zip)
    if(zipError !== true){
        setError(zipError)
        return
    }

    let phoneError = validateInputField("téléphone", "phone", phone)
    if(phoneError !== true){
        setError(phoneError)
        return
    }

    let cityError = validateInputField("ville", "city", city)
    if((cityError !== true)){
        setError(cityError)
        return
    }

    //A la fin de tous les tests des différents champs de formulaire, s'il n'y a pas d'erreurs, on retourne true.

    //On envoie alors un objet qui stocke toutes les valeurs des champs dans la requête vers le back.

    const datas = {
        lastname: lastname,
        firstname: firstname,
        email: email,
        password: password,
        address: address,
        complement_address: complementAddress,
        zip: zip,
        city: city,
        phone: phone
    }

    addOneUser(datas)
    .then((res) => {
       if(res.status === 200){
        setRedirect(true)
       } else {
        setError(res.msg)
       }
    })
    .catch(err=>console.log(err))
}

//On redirige vers Login
if(redirect){
    return <Navigate to="/login" />
}

//fonction d'affichage du mot de passe
const togglePasswordVisibility = () => {
    const passwordField = document.getElementById("password");
    const toggleBtn = document.getElementById("toggle-password");
    
    // Bascule entre le type "password" et "text"
    if (passwordField.type === "password") {
        passwordField.type = "text"// Affiche le mot de passe
        toggleBtn.textContent = "Masquer le mot de passe" // Met à jour le texte
    } else {
        passwordField.type = "password"; // Masque le mot de passe
        toggleBtn.textContent = "Afficher le mot de passe" // Met à jour le texte
    }
}

return (
    <section id="register">
        <h2>S'enregistrer</h2>
        {error !== null && <p>{error}</p>}
    
        <form onSubmit={onSubmitForm}>
        <p>champs obligatoires*</p>
            <label htmlFor="nom">Votre nom<span>*</span></label>
            <input type="text"
            id="nom"
            onChange={(e)=>{
                setLastname(e.currentTarget.value)
            }} 
            />
            <label htmlFor="prénom">Votre prénom<span>*</span></label>
            <input type="text"
            id="prénom"
            onChange={(e)=>{
                setFirstname(e.currentTarget.value)
            }}
            />
            <label htmlFor="mail">Votre mail<span>*</span></label>
            <input type="email"
            id="email"
            onChange={(e)=>{
                setEmail(e.currentTarget.value)
            }}
            />
            <label htmlFor="password">Votre mot de passe<span>*</span></label>
            <input type="password"
            id="password"
            onChange={(e)=>{
                setPassword(e.currentTarget.value)
            }}
            />
            <a href="#" id="toggle-password" 
            type="button" 
            aria-label="Afficher le mot de passe"
            onClick={togglePasswordVisibility}>Afficher le mot de passe</a>

            <label htmlFor="adresse">Votre adresse<span>*</span></label>
            <input type="text"
            id="adresse"
            onChange={(e)=>{
                setAddress(e.currentTarget.value)
            }}
            />
            <label htmlFor="complement">Complément d'adresse</label>
            <input type="text"
            id="complement"
            onChange={(e)=>{
                setComplementAddress(e.currentTarget.value)
            }}
            />
            <label htmlFor="codePostal">Votre code postal<span>*</span></label>
            <input type="text"
            id="codePostal"
            onChange={(e)=>{
                setZip(e.currentTarget.value)
            }}
            />
            <label htmlFor="ville">Votre ville<span>*</span></label>           
            <input type="text"
            id="ville"
            onChange={(e)=>{
                setCity(e.currentTarget.value)
            }}
            />
            <label htmlFor="tel">Votre numéro de téléphone<span>*</span></label>
            <input type="tel"
            id="tel"
            onChange={(e)=>{
                setPhone(e.currentTarget.value)
            }}
            />
           <input type="submit" value="Enregistrer" aria-label="Bouton pour enregistrer votre compte" /> 
        </form>
    </section>
)
}

export default Register