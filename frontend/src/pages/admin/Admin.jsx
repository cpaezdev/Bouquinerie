import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"


const Admin = (props) => {
return (<section id="admin" className="container">

    <h2>Espace administrateur</h2>
    <article>
    <h3>Livres</h3>
    
    <h4><Link to="/admin/addbooks">Ajouter d'un livre</Link></h4>

    <h4><Link to="/admin/books">Modification d'un livre et ajouter d'un ou des auteurs</Link></h4>
    <p>Gestion et liste de tous les livres. Vous pouvez modifier les données d'un livre et ajouter ou supprimer des auteurs d'un livre.</p>
    </article>

    <article>
    <h3>Auteurs, genres et états</h3>
    <h4><Link to="/admin/addauthors">Auteurs</Link></h4>
    <p>Gestion et liste des auteurs : vous pouvez ajouter, modifier ou supprimer un auteur.</p>
    <h4><Link to="/admin/addcategories">Genres</Link></h4>
    <p>Gestion et liste des genres : vous pouvez ajouter, modifier ou supprimer un genre.</p>
    <h4><Link to="/admin/addconditions">Etats des livres</Link></h4>
    <p>Gestion et liste des états : vous pouvez ajouter ou supprimer un état.</p>
    </article>

    <article>
    <h3>Commandes</h3>
    <h4><Link to="/admin/orders">Gestion des commandes</Link></h4>
    <p>Vous visualisez l'intégralité des commandes et pouvez gérez leur avancée.</p>
    </article>

    <article>
    <h3>Utilisateurs</h3>
    <h4><Link to="/admin/users">Liste des utilisateurs</Link></h4>
    </article>

    <article>
    <h3>Messages des contacts</h3>
    <h4><Link to="/admin/contacts">Messages reçus</Link></h4>
    </article>
</section>
)
}

export default Admin