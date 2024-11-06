"use client";
import { useAuth } from "@/components/authProvider";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  
  return res.json();
};

const WAITLIST_API_URL = '/api/waitlists/';

export default function Page() {
  const { data, error } = useSWR(WAITLIST_API_URL, fetcher);
  const auth = useAuth()
  // Ensure the effect only runs when error changes
  useEffect(() => {
    if (error?.status === 401) {
      auth.loginRequired()
    }
  }, [auth, error]); // Add error and router as dependencies

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 font-bold">Error occurred while fetching data. Please try again later.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  // Convert object into an array
  const dataArray = Object.values(data);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans bg-gray-100">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Waitlist Data</h1>
        <div className="w-full max-w-lg">
          {dataArray && dataArray.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {dataArray.map((item, index) => (
                <li key={index} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">User ID: {item.id}</p>
                    <p className="text-sm text-gray-500">
                      Email: <span className="text-sm text-gray-500 hover:text-green-500 cursor-pointer">{item.email}</span> 
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No data available.</p>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-gray-400">© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
