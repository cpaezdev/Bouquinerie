const express = require("express")
const app = express()

const mysql = require("promise-mysql")

const cors= require("cors")
app.use(cors())

//indique au middleware de créer automatiquement les répertoires parent nécessaires si le chemin de destination du fichier téléchargé n'existe pas encore.
const fileUpload = require("express-fileupload")
app.use(fileUpload({
    creatParentPath: true
}))

//parse les url pour traiter les données encodées en URL dans les requêtes HTTP POST
app.use(express.urlencoded({extended: false}))
//permet à l'application de traiter les données JSON reçues dans le corps des requêtes HTTP. et les convertit automatiquement en objets JavaScript utilisables dans le code backend.
app.use(express.json())
//permet de servir des fichiers statiques à partir d'un répertoire spécifique, facilitant ainsi la gestion des ressources comme les images, les fichiers CSS et JavaScript.
app.use(express.static(__dirname+'/public'))

const dotenv =require("dotenv")
dotenv.config()

//récupération de nos routes
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const bookRoutes = require("./routes/bookRoutes")
const orderRoutes = require("./routes/orderRoutes")
const contactRoutes = require("./routes/contactRoutes")

mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}). then((db)=>{
    console.log('Youpi, connecté à la BDD')
    //maintenir la connexion active 
    setInterval(async () => {
        const res = await db.query("SELECT 1")
    }, 10000)
    //route simple pour tester que le serveur fonctionne et pour fournir une réponse par défaut.
    app.get('/', async (req, res, next) => {
        res.json({status: 200, msg: "BDS ok"})
    })
    //fonctions configurent les différentes routes pour l'application
    userRoutes(app, db)
    authRoutes(app, db)
    bookRoutes(app, db)
    orderRoutes(app, db)
    contactRoutes(app, db)
    
}).catch(err => console.log(err))

const PORT = process.env.PORT || 9500

app.listen(PORT, () => {
    console.log(`Serveur à l'écoute sur le port ${PORT}`)
})