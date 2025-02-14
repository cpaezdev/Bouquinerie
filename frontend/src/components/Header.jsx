import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logoutUser } from "../slices/userSlice"
import { cleanBasket, selectBasket } from "../slices/basketSlice"

import logo from "../assets/img/logoBds.png"
import SearchBar from "../components/SearchBar"
import MenuBurger from "../components/MenuBurger"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons"

import { faUser as faUserSolid, faCartShopping, faRightFromBracket, faGears } from "@fortawesome/free-solid-svg-icons"


const Header = (props) => {
    const user = useSelector(selectUser)
    const basket = useSelector(selectBasket)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isSection2Visible, setIsSection2Visible] = useState(true);

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 0.5) {
                setIsSection2Visible(false);
            } else {
                setIsSection2Visible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Nettoyer l'écouteur d'événements lors du démontage du composant
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /*-----Déconnection de l'utilisateur-----*/
        const logout = (e) => {
            e.preventDefault()
            // Supprimer le token de l'utilisateur
            window.localStorage.removeItem("bds-token")

            // Vérifier si l'utilisateur est connecté et possède un ID
            if (user && user.infos && user.infos.id) {
                // Vider le localStorage pour le panier spécifique à cet utilisateur
                window.localStorage.removeItem(`bds-basket-${user.infos.id}`)
            }

            window.localStorage.removeItem("bds-basket")
            // Vider le panier dans le store Redux
            dispatch(cleanBasket())

            // Déconnecter l'utilisateur dans Redux
            dispatch(logoutUser())

            // Rediriger vers la page de login
            navigate("/login")
        }


        return (
            <header>
                <section className="container">
                    <div>
                        <img src={logo} alt="Logo de la Bouquinerie de Sarlat" />
                        <Link to="/"><span>Bouquinerie de Sarlat</span></Link>
                    </div>
                    <nav>
                        <MenuBurger />

                        {user.isLogged === false ? (
                            <div>
                                <Link to="/login"><FontAwesomeIcon icon={faUserRegular} /></Link>
                            </div>
                        ) : (
                            <div>
                                <Link to="/profil"><FontAwesomeIcon icon={faUserSolid} /></Link>
                                <a href="#" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></a>
                            </div>
                        )}
                        <Link to="/basket">
                            <FontAwesomeIcon icon={faCartShopping} />
                            {basket.basket.length > 0 && <span>{basket.basket.length}</span>}
                        </Link>
                        {user.infos.status === "admin" && (
                            <div>
                                <Link to="/admin"><FontAwesomeIcon icon={faGears} /></Link>
                            </div>
                        )}
                    </nav>
                </section>

                <section className={isSection2Visible ? "visible" : "hidden"}>
                <Link to="/"><h1>BOUQUINERIE DE SARLAT</h1></Link>
                <p>VENTE DE LIVRES D'OCCASION</p>
            </section>

                <section>
                    <SearchBar />
                </section>
            </header>
        )
    }

    export default Header 
