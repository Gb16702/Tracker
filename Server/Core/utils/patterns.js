const emailPattern = () => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

const usernamePattern = () => {
    return /^[a-zA-Z0-9]+$/;
}

module.exports = {
    emailPattern,
    usernamePattern
};