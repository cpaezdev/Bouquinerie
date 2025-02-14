import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons"


const Footer = (props) => {

    return (<footer>
        <section>
        <Link to="/"><h2>BOUQUINERIE DE SARLAT</h2></Link>
            <p>VENTE DE LIVRES D'OCCASION</p>
        </section>

        <section>
            <a href="https://www.facebook.com/bouquinerie.de.sarlat" target="_blank" rel="Lien vers le compte du Facebook de la Bouquinerie"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="https://www.instagram.com/bouquineriedesarlat/" target="_blank" rel="Lien vers le compte Instagram de la Bouquinerie"><FontAwesomeIcon icon={faInstagram} /></a>
            <article>
            <p><Link to="/contact">Nous contacter</Link></p>
            <p><Link to="/cgv">Conditons générales de vente</Link></p>
            <p><Link to="/rgpd">RGPD</Link></p>
            </article>
        </section>
    </footer>)
}

export default Footer