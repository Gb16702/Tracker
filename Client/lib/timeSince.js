export const timeSince = date => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return `${interval} an${interval > 1 ? "s" : ""}`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} mois`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} jour${interval > 1 ? "s" : ""}`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} heure${interval > 1 ? "s" : ""}`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval > 1 ? "s" : ""}`;
    }

    return `Moins d'une minute`;
}