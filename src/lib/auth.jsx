import { cookies } from "next/headers"

const tokenAge = 3600
const TOKEN_NAME = 'auth-token'
const TOKEN_REFRESH_TOKEN = 'auth-refresh-token'

export async function getToken() {
    const myAuthToken =  await cookies().get(TOKEN_NAME)
    console.log(myAuthToken)
    return myAuthToken?.value
}

export async function getRefreshToken() {
    const myAuthRefreshToken = await cookies().get(TOKEN_REFRESH_TOKEN)
    console.log(myAuthRefreshToken)
    return myAuthRefreshToken?.value
}

export async function setToken(authToken) {
    return await cookies().set({
        name: TOKEN_NAME,
        value: authToken,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 3600,
    })
}


export async function setRefreshToken(authRefreshToken) {
    return await cookies().set({
        name: TOKEN_REFRESH_TOKEN,
        value: authRefreshToken,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 3600,
    })
}

export async function deleteToken() {
    await cookies().delete(TOKEN_REFRESH_TOKEN)
    return await cookies().delete(TOKEN_NAME)
}