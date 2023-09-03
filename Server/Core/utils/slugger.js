const slugger = string => string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")

module.exports = slugger;