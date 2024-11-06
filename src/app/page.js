"use client"
import { useAuth } from "@/components/authProvider";
import { ThemeToggleButton } from "@/components/themeToggleButton";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const auth = useAuth()
  const {data, error, isLoading} = useSWR('http://localhost:8001/api/home', fetcher)
  if (error) return <div> Error happened</div>
  if (isLoading) return <div> Loading... </div>
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        {auth.isAuthenticated? 'Hello user': 'Hello guest'}
      </div>
      <div>
        <ThemeToggleButton/>

      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
