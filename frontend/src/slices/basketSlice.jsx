import { createSlice } from "@reduxjs/toolkit"

// Récupération du panier présent dans le localStorage
let lsBasket = [] 

// On vérifie si "bds-basket" existe dans le localStorage
const storedBasket = window.localStorage.getItem("bds-basket")

try {
    // On parse uniquement si ce n'est pas `null` et que c'est une chaîne valide
    if (storedBasket) {
        lsBasket = JSON.parse(storedBasket) 
    }
} catch (error) {
    console.error("Erreur lors du parsing du panier depuis le localStorage:", error) 
    // Si une erreur survient, initialisez un panier vide
    lsBasket = [] 
}

//Cette fonction va calculer le poids total de livres dans le panier venant du localStorage. On boucle à l'intérieur et on additionne les quantités de chaque ligne.
const calculateTotalWeight = (basket) => {
    let weight = 0

    basket.forEach((b) => {
        weight += b.weight
    })
    return weight
}
//Cette fonction va calculer la quantité total de livres dans le panier venant du localStorage. On boucle à l'intérieur et on additionne les quantité de chaque ligne.
const calculateTotalBooks = (basket) => {
    let quantity = 0

    basket.forEach((b) => {
        quantity += b.quantity
    })
    return quantity
}

//Cette fonction va calculer le prix total du panier venant du localStorage. On boucle à l'intérieur et on additionne les prix de chaque ligne.
const calculateTotalAmountBooks = (basket) => {
    let price = 0

    basket.forEach((b) => {
        price += b.price
    })
    return price
}

//On appel la fonction pour initialiser un prix par défaut lors du chargement du panier dans le store de redux.
let myPrice = calculateTotalAmountBooks(lsBasket)
let myQuantity = calculateTotalBooks(lsBasket)
let myWeight = calculateTotalWeight(lsBasket)

//On initialise la state:
const initialState = {
    basket: lsBasket,
    totalAmountBooks: myPrice,
    totalBooks: myQuantity,
    totalWeight: myWeight
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        modifyBasket: (state, action) => {
            let total = calculateTotalAmountBooks(action.payload)
            let totalQuantity = calculateTotalBooks(action.payload)
            let totalWei = calculateTotalWeight(action.payload)
            state.basket = action.payload
            state.totalAmountBooks = total
            state.totalBooks = totalQuantity
            state.totalWeight = totalWei
        },
        cleanBasket: (state) => {
            state.basket = []
            state.totalAmountBooks = 0,
            state.totalBooks = 0,
            state.totalWeight = 0
        }
    }
})

export const { modifyBasket, cleanBasket } = basketSlice.actions
export const selectBasket = (state) => state.basket
export default basketSlice.reducer
