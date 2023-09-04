import {decode} from "next-auth/jwt"
import { cookies } from "next/headers"

export const decodeSession = async () => {
    let cookie = cookies()
    if(cookie.has("__Secure-next-auth.session-token") || cookie.has("next-auth.session-token")) {
        cookie = cookie.get(("__Secure-next-auth.session-token")) || cookie.get(("next-auth.session-token"))
    }

    const decoded = await decode({token : cookie.value, secret : process.env.NEXTAUTH_SECRET})

    return decoded
}
