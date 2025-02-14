export const validateInputField = (label, type, value) => {
    //si le champs est vide
    if (value === "") {
        return `Veuillez renseigner le champ ${label}.`
    }

    switch (type) {
        //Dans le cas de l'email
        case "email":
            //On test l'email à l'aide d'une regex
            const regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            //si le test du regex est négatif
            if (regMail.test(value) === false) {
                return `Le ${label} n'est pas valide.`
            }
            break;
        //Dans le cas du password
        case "password":
            //On test aussi le password à l aide d'une regex
            const regPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~`]).{8,}$/;
            //Si le test du regex est négatif
            if (regPass.test(value) === false) {
                return `Le ${label} doit contenir minimun 8 caractères et au moins: un chiffre, une lettre en majuscule, une lettre en minuscule et un caractère spécial.`
            }
            break;
        //Dans le cas de l'adresse
        case "address":
            if (value.length > 100) {
                return `L'adresse ${label} est invalide.`
            }
            else if (value.length < 10) {
                return `L'adresse ${label} est incomplète.`
            }
            break;
        //Dans le cas du code postal
        case "zip":
            if(value.length !== 5 || isNaN(value)){
                return `Le code postal est invalide.`
            }
            break;
        //Dans le cas du numéro de téléphone
        case "phone":
            const regPhone = /^\d{10}$/;
            if (regPhone.test(value) === false) {
                return `Le numéro de ${label} est invalide. Il doit contenir exactement 10 chiffres sans lettres ni autres caractères.`
            }
            break;
    }
    //Toutes les conditions sont remplies => on retourne true
    return true

}