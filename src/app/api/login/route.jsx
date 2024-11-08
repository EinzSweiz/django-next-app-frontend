"use server"
import { NextResponse } from "next/server"
import { getRefreshToken, getToken, setRefreshToken, setToken } from "@/lib/auth"

const DJANGO_API_LOGIN_URL = "http://localhost:8001/api/token/pair"

export async function POST(request) {
    const requestData = await request.json();
    const jsonData = JSON.stringify(requestData);

    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    };

    const response = await fetch(DJANGO_API_LOGIN_URL, requestOption);
    const responseData = await response.json();

    // Check if login was successful
    if (response.ok) {
        const { username, access, refresh } = responseData;
        setToken(access);
        setRefreshToken(refresh);
        return NextResponse.json({"loggedIn": true, "username": username}, {status: 200})
    }

    // Return the response with the tokens
    return NextResponse.json({"loggedIn": false, ...responseData}, {status: 400});
}
