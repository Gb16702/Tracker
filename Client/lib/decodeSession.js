import {decode} from "next-auth/jwt"
import { cookies } from "next/headers"

export const decodeSession = async () => {
    let cookie = cookies()
    if(cookie.has("next-auth.session-token")) {
        cookie = cookie.get("next-auth.session-token")
    }

    const decoded = await decode({token : cookie.value, secret : process.env.NEXTAUTH_SECRET})

    return decoded
}
