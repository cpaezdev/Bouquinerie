import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../slices/userSlice'
import { cleanBasket } from '../slices/basketSlice'


const Success = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    useEffect(() => {
        window.localStorage.removeItem(`bds-basket-${user.infos.id}`)
        dispatch(cleanBasket())
    }, [])

    return (
        <section id='success'>
            <h2>La Bouquinerie de Sarlat vous remercie</h2>
            <p>Votre commande a été effectuée avec succès</p>
            <Link to="/">Retour à l'accueil</Link>
        </section>
    )
}
export default Success