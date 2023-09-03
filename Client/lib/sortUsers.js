export const sortUsers = (users, value) => {
    let sortedUsersCopy = [...users];

    switch (value) {
        case "name-asc":
          sortedUsersCopy.sort((a, b) => (a.username > b.username ? 1 : -1));
          break;
        case "name-desc":
          sortedUsersCopy.sort((a, b) => (a.username < b.username ? 1 : -1));
          break;
        case "role-asc":
          sortedUsersCopy.sort((a, b) => (a.roles.name > b.roles.name ? 1 : -1));
          break;
        case "role-desc":
          sortedUsersCopy.sort((a, b) => (a.roles.name < b.roles.name ? 1 : -1));
          break;
        case "date-asc":
          sortedUsersCopy.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
          break;
        case "date-desc":
          sortedUsersCopy.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
          break;
      }
        return sortedUsersCopy;
    };