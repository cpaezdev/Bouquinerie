
import bds from "../assets/shopImg/bds.jpg"
import expo from "../assets/shopImg/bdsExpo.jpg"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"

const BookShop = (props) => {

    return (<section id="book-shop" >
{/*div qui contient l image pricipale*/}
        <div></div>
        <article>
            <img src={bds} alt="Rayon littérature française et étrangère de la Bouquinerie de Sarlat" />
            <h3>Vente de livres d'occasions</h3>
            <p>La Bouquinerie de Sarlat est un lieu de vente de <strong>livres d’occasions</strong>, pour tous les âges (des livres pour les bébés jusqu’aux adultes et de tous les genres), d’<strong>exposition d’artistes et d’artisans</strong>.</p>
            <p>La Bouquinerie de Sarlat est ouverte à l'année.</p>
            <img src={bds} alt="Rayon littérature française et étrangère de la Bouquinerie de Sarlat" />
        </article>
        <article>
            <img src={expo} alt="Exposition de dessins et d'objets réalisées par des artistes et d'artisans." />
            <h3>Expositions d'artistes et d'artisans</h3>
            <p>La Bouquinerie de Sarlat est aussi un lieu d'<strong>exposition d'artistes et d'artisans</strong>. En vitrine ou à l'intérieur vous pourrez découvrir leur travail.</p>
            <p>En ce moment en boutique, retrouvez le travail de:</p>
            <p><strong>Jacques Crémon</strong>, tourneur sur bois<a href="https://www.instagram.com/tour.nant_de_vie/" target="_blank" rel="Lien vers le compte Instagram de tournant de vie"><br /><FontAwesomeIcon icon={faInstagram} /> tournant_de_vie</a></p>
            <p><strong>Maria Cécilia Paez</strong>, artiste-auteur<a href="https://www.instagram.com/mcpaezart/" target="_blank" rel="Lien vers le compte Instagram de mcpaezart"><br /><FontAwesomeIcon icon={faInstagram} /> mcpaezart</a></p>
            <img src={expo} alt="Exposition de dessins et d'objets réalisées par des artistes et d'artisans." />
        </article>
        <article className="container">
            <h4>Horaires</h4>
            <p>Les horaires diffèrent pendant les vancances scolaires.</p>
            <ul>
                <li>Lundi: 10h - 18h</li>
                <li>Mardi: 10h - 18h</li>
                <li>Mercredi: 10h - 18h</li>
                <li>Jeudi: FERME</li>
                <li>Vendredi: 10h - 18h</li>
                <li>Samedi: 10h - 18h</li>
                <li>Dimanche: FERME</li>
            </ul>
            <h4>Contacts</h4>
            <address>
                <p><a href="https://www.google.fr/maps/place/3+Rue+Papucie,+24200+Sarlat-la-Can%C3%A9da/@44.8904164,1.2127397,17z/data=!3m1!4b1!4m6!3m5!1s0x12aca9d765add2cd:0x963a3fdb223c7075!8m2!3d44.8904126!4d1.2153146!16s%2Fg%2F11cncdlc1p?entry=ttu&g_ep=EgoyMDI0MTAwNy4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="Lien vers google map situant la Bouquinerie de Sarlat"><FontAwesomeIcon icon={faLocationDot} /> 3 rue Papucie,<br /> 24200 Sarlat-la-Canéda</a></p>
                <p><FontAwesomeIcon icon={faPhone} /><a href="tel:+33781934390"> 07.81.93.43.90</a></p>
                <p><FontAwesomeIcon icon={faEnvelope} /><a href="mailto:bouquineriedesarlat@gmail.com"> bouquineriedesarlat@gmail.com</a></p>
            </address>
        </article>
    </section>)
}

export default BookShop