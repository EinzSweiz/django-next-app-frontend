"use client";
// import { cookies } from "next/headers";
// const LOGIN_URL = "http://localhost:8001/api/token/pair"
const LOGIN_URL = "/api/login/"


async function handleSubmit(event) {
  event.preventDefault();
  console.log(event, event.target);
  const formData = new FormData(event.target)
  const ObjectFromForm = Object.fromEntries(formData)
  const jsonData = JSON.stringify(ObjectFromForm)
  const requestOptions = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: jsonData
  }
  const response = await fetch(LOGIN_URL, requestOptions)
  const data = await response.json()
  console.log(data)

  if (response.ok) {
    console.log('Logged in!')
    localStorage.setItem('token', 'abc')
  }
}

export default function Page() {
  return (
    <div className="flex items-center justify-center h-[95vh] bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-black mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username-element" className="block text-sm font-medium text-black">
              Username
            </label>
            <input
              id="username-element"
              type="text"
              name="username"
              placeholder="Enter your username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password-element" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              id="password-element"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
