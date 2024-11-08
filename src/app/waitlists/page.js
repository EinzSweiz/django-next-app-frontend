"use client";
import WaitlistTable from "./table";

export default function Page() {

  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans bg-gray-100">
      <div className="row-start-1 flex justify-center items-center w-full h-full">
        <WaitlistTable />
      </div>
      <footer className="row-start-2 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-gray-400">© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
