// const requiredErrorMessage = "Ce champs est requis";
// const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const forbiddenWords = ["password", "123456", "PASSWORD", "azerty"];
// const minLength = 4;
// const maxLength = 48;

// const isForbidden = password => {
//     return forbiddenWords.some(word => password.toLowerCase().includes(word));
// }

// const isPasswordSecure = password => {
//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasNumbers = /\d/.test(password);
//     const hasSymbols = /[^A-Za-z0-9]/.test(password);

//     const isSecure = hasUppercase && hasLowercase && hasNumbers && hasSymbols;
//     return isSecure;
// }

// const formValidation = (values) => {
//     const errors = {};

//     if(!values.email) {
//         errors.email = requiredErrorMessage
//     }
//     else if(!emailPattern.test(values.email)) {
//         errors.email = "L'adresse mail est invalide"
//     }

//     if(!values.password) {
//         errors.password = requiredErrorMessage
//     }
//     else if(values.password.length < minLength) {
//         errors.password = `Ce champs doit faire au moins ${minLength} caractères`
//     }
//     else if(values.password.length > maxLength) {
//         errors.password = `Ce champs doit faire au plus ${maxLength} caractères`
//     }
//     else if (isForbidden(values.password)) {
//         errors.password = "Ce mot de passe est trop simple"
//     }
//     else if (!isPasswordSecure(values.password)) {
//         errors.password = "Ce mot de passe n'est pas assez sécurisé"
//     }

//     return errors;
// }

// module.exports = formValidation;