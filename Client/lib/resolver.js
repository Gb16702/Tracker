import * as yup from 'yup';

const usernamePattern = /^[a-zA-Z0-9]+$/;
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const forbiddenWords = ["password", "123456", "PASSWORD", "azerty"]
const [forbiddenWordsToUppercase, forbiddenWordsToLowercase] = forbiddenWords.reduce((arr, word) => {
    arr[0].push(word.toUpperCase());
    arr[1].push(word.toLowerCase());
    return arr;
}, [[], []])

const resolver = yup.object().shape({
    username : yup.string().required("Ce champs est requis").min(2, value => `Ce champs doit faire au moins ${value.min} caractères`).max(24, value => `Ce champs doit faire au plus ${value.max} caractères`).matches(usernamePattern, "Ce champs ne peut contenir que des caractères alphanumériques"),
    email : yup.string().required("Ce champs est requis").matches(emailPattern, "L'adresse mail est invalide"),
    password : yup.string().required("Ce champs est requis").notOneOf([...forbiddenWordsToUppercase, ...forbiddenWordsToLowercase], value =>  `Le mot de passe "${value.value}" est trop faible`).min(6, (value) => `Le mot de passe doit faire au moins ${value.min} caractères`).required("Ce champs est requis"),
    confirmPassword : yup.string().required("Ce champs est requis").test("equal-to-password", "Les mots de passe doivent correspondre", function (value){
        const {password} = this.parent;
        return value === password
    })
})

export default resolver;