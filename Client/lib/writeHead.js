const writeHead = (value) => {
  let head = [];

  if (value == "roles") {
    head = ["Rôle", "Grade", "Créé il y a", "Utilisateurs"];
  } else if (value == "utilisateurs") {
    head = ["Utilisateur", "Email", "Créé il y a", "Actions"];
  } else if (value == "jeux") {
    head = ["Jeu", "Popularité", "Créé il y a", "Actions"];
  } else if (value == "sujets") {
    head = ["Sujet", "Créé il y a", "Dernière Modification", "Actions"];
  } else if (value == "retours") {
    head = ["Auteur", "Titre", "Note", "Créé il y a", "Publié", "Actions"];
  }
  return head;
};

export default writeHead;
