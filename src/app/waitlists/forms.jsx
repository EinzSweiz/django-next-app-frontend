"use client";
import { useState } from "react";
import { useAuth } from "@/components/authProvider";

const WAITLIST_API_URL = '/api/waitlists/';

export default function WaitlistForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const objectFromForm = Object.fromEntries(formData);

        if (!objectFromForm.email) {
            document.querySelector('#email-error').textContent = 'Email cannot be empty';
            return;
        }

        const jsonData = JSON.stringify(objectFromForm);
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        };
        
        setLoading(true);
        setError('');

        try {
            const response = await fetch(WAITLIST_API_URL, requestOptions);
            const data = await response.json();

            if (response.ok) {
                console.log('You are in the waitlist!');
                setLoading(false);
                setSuccess(true);
                // Reset the form or provide feedback
            } else {
                throw new Error('Failed to submit the form');
            }
        } catch (err) {
            setLoading(false);
            setError('An error occurred. Please try again.');
            console.error(err);
        }
    }

    function handleEmailBlur(event) {
        const emailElement = event.target.value;
        const emailErrorElement = document.querySelector('#email-error');
        if (emailElement.length < 1) {
            emailErrorElement.textContent = 'Email cannot be empty';
        } else {
            emailErrorElement.textContent = '';
        }
    }

    return (
        <div className="flex items-center justify-center h-[95vh] bg-gray-100">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-center text-black mb-6">Waitlist</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email-element" className="block text-sm font-medium text-black">
                  Email
                </label>
                <input
                  id="email-element"
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  onBlur={handleEmailBlur}
                />
                <p id="email-error" className="text-red-500 text-sm mt-1"></p>
              </div>

              {error && (
                <div className="text-red-500 text-sm mb-4">
                  {error}
                </div>
              )}

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
                      <span className="loader"></span>
                    ) : success ? (
                      <span className="text-white">✔</span>
                    ) : (
                      "Submit"
                    )}
                  </div>
                </button>
              </div>
            </form>

            {success && (
              <div className="text-green-500 text-sm mt-4 text-center">
                Successfully added to the waitlist!
              </div>
            )}
          </div>
        </div>
    );
}
