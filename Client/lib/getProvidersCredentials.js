export const getCredentials = (clientIdEnv, clientSecretEnv) => {
        const clientId = process.env[clientIdEnv]
        const clientSecret = process.env[clientSecretEnv]

        return { clientId, clientSecret }
}

export const getGoogleCredentials = () => {
       return getCredentials("GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET")
}

export const getDiscordCredentials = () => {
    return getCredentials("DISCORD_CLIENT_ID", "DISCORD_CLIENT_SECRET")
}