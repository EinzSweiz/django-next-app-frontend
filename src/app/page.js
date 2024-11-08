"use client";

import { useAuth } from "@/components/authProvider";
import { ThemeToggleButton } from "@/components/themeToggleButton";
import Image from "next/image";
import WaitlistForm from "./waitlists/forms";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Home() {
  const auth = useAuth();
  const { data, error, isLoading } = useSWR("http://localhost:8001/api/home", fetcher);

  if (error) return <div>Error happened</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen p-8 sm:p-20">
      <div className="flex flex-col items-center gap-16">
        <WaitlistForm />
        <ThemeToggleButton />
      </div>
    </div>
  );
}
