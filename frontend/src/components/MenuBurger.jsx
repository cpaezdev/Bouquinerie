import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { takeAllCategories } from "../api/category"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons"

const MenuBurger = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [categoriesOpen, setCategoriesOpen] = useState(false)
    const [categories, setCategories] = useState([])

    // Chargement de toutes les catégories depuis l'API
    useEffect(() => {
        takeAllCategories()
            .then((res) => {
                if (res.status === 200) {
                    setCategories(res.result)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    // Fonction pour ouvrir/fermer les sous-catégories
    const toggleCategories = () => {
        setCategoriesOpen(!categoriesOpen)
    }

    // Fonction pour ouvrir le menu au survol de la souris
    const handleMouseEnter = () => {
        setMenuOpen(true)
    }

    // Fonction pour fermer le menu quand la souris sort du menu
    const handleMouseLeave = () => {
        setMenuOpen(false)
    }

    return (
        <>
            {/* Icône du menu burger */}
            <a 
                href="#" 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave} 
                aria-label="Toggle menu">
                <FontAwesomeIcon icon={faBars} />
            </a>

            {/* Menu burger */}
            {menuOpen && (
                <nav 
                    id="burger-menu" 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                >
                    <ul>
                        <li>
                            <Link to="/bookshop" onClick={() => setMenuOpen(false)}>La Boutique</Link>
                        </li>
                        <li>
                            <Link to="/allbooks" onClick={() => setMenuOpen(false)}>Tous les Livres</Link>
                        </li>
                        <li>
                            {/* Sous-menu pour les genres */}
                            <a href="#" onClick={toggleCategories}>Livres par genres</a>
                            {categoriesOpen && (
                                <ul >
                                    {categories.map((category) => (
                                        <li key={category.id} onClick={() => setMenuOpen(false)}>
                                            <Link to={`/booksCategory/${category.id}`}>{category.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link to="/cgv" onClick={() => setMenuOpen(false)}>Conditions générales de vente</Link>
                        </li>
                        <li>
                            <Link to="/rgpd" onClick={() => setMenuOpen(false)}>RGPD</Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={() => setMenuOpen(false)}>Nous contacter</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    )
}

export default MenuBurger  
