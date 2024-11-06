"use client";
import { useState } from "react";
import { useAuth } from "@/components/authProvider";

const LOGIN_URL = "/api/login/";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const auth = useAuth()

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const ObjectFromForm = Object.fromEntries(formData);

    // Check if username is empty
    if (!ObjectFromForm.username) {
      document.querySelector('#username-error').textContent = 'Username cannot be empty';
      return; // Prevent form submission
    }

    const jsonData = JSON.stringify(ObjectFromForm);
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonData
    };

    setLoading(true); // Start loading spinner

    const response = await fetch(LOGIN_URL, requestOptions);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      console.log('Logged in!');
      setLoading(false); // Stop loading spinner
      setSuccess(true);  // Show success state
      auth.login()
      // Redirect after showing success
      setTimeout(() => {
      }, 2000); // Give it 2 seconds before redirecting
    } else {
      setLoading(false); // Stop loading on error
      // Handle login error (e.g., show error message)
    }
  }

  // Username validation on blur
  function handleUsernameBlur(event) {
    const username = event.target.value;
    const usernameErrorElement = document.querySelector('#username-error');
    if (username.length < 1) {
      usernameErrorElement.textContent = 'Username cannot be empty';
    } else {
      usernameErrorElement.textContent = ''; // Clear error message if valid
    }
  }

  // Password validation on blur
  function handlePasswordBlur(event) {
    const password = event.target.value;
    const passwordErrorElement = document.querySelector('#password-error');
    if (password.length < 1) {
      passwordErrorElement.textContent = 'Password cannot be empty';
    } else {
      passwordErrorElement.textContent = ''; // Clear error message if valid
    }
  }

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
              onBlur={handleUsernameBlur}
            />
            <p id="username-error" className="text-red-500 text-sm mt-1"></p>
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
              onBlur={handlePasswordBlur}
              required
            />
            <p id="password-error" className="text-red-500 text-sm mt-1"></p>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-2 px-4 rounded-md shadow transition-all duration-500
                ${success ? "bg-green-500" : "bg-indigo-600 hover:bg-indigo-700"} 
                ${loading ? "rounded-full" : "rounded-md"}
                text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative`}
            >
              <div className="flex items-center justify-center">
                {loading ? (
                  <span className="loader"></span> // Show loader spinner when loading
                ) : success ? (
                  <span className="text-white">✔</span> // Show checkmark on success
                ) : (
                  "Login"
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
