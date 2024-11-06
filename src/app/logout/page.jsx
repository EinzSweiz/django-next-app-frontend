"use client";

import { useAuth } from "@/components/authProvider";

const LOGOUT_URL = "/api/logout/"

export default function Page() {
  const auth = useAuth()
  async function handleClick(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: ""
    }
    const response = await fetch(LOGOUT_URL, requestOptions)  
    if (response.ok) {
      console.log('Logged out!')
      auth.logout()
    }
  }
  return (
    <div className="flex items-center justify-center h-[95vh] bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-black mb-6">Are you sure you want logout?</h1>
        <button
              type="submit"
              onClick={handleClick}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Yes, Logout
            </button>
      </div>
    </div>
  );
}
