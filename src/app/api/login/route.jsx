"use server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const DJANGO_API_LOGIN_URL = "http://localhost:8001/api/token/pair"

export async function POST(request) {
    const myAuthToken = cookies().get('auth-token')
    console.log(myAuthToken)
    const requestData = await request.json()
    const jsonData = JSON.stringify(requestData)
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    }
    const response = await fetch(DJANGO_API_LOGIN_URL, requestOption)
    const responseData = await response.json()
    if (requestData.ok){
        const authToken = responseData.access
        cookies().set({
            name: 'auth-token',
            value: authToken,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 3600,
        })
    }
    return NextResponse.json({"Hello": "World", 'token': myAuthToken.value}, {status: 200})
}