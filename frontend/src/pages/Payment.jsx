import {loadStripe} from "@stripe/stripe-js"
import CheckoutForm from "../components/Checkout-form"
import {Elements} from "@stripe/react-stripe-js"

const Payment = (props) => {
    
    //la clé publique de stripe me permet de brancher l'environnement de l'api stripe à mon compte stripe API
    const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
    return (<section id="payment">
        <h2 >Paiement</h2>
        <p>Commande n° {props.params.id}</p>
        {/*On va brancher l'environnement des fonctionnalitées de react-stripe
            qui va permettre d'effectuer les échanges avec l'api stripe de manière sécurisée
        */}
        <Elements stripe={stripePromise}>
            <CheckoutForm orderId={props.params.id} />
        </Elements>
    </section>)
}

export default Payment