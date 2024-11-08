"use client"
import { useAuth } from "@/components/authProvider"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import useSWR from "swr"


const fetcher = async url => {
    const res = await fetch(url)
    if (!res.ok) {
        const error = new Error("An error occured while fetching the data")
    error.info = await res.json()
    error.status = res.status
    throw error 
    }
    return res.json()
}
const WAITLIST_API_URL = '/api/waitlists/';

  
export default function WaitlistTable() {
    const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher);
    const auth = useAuth()
    const router = useRouter()
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
    const dataArray = Object.values(data)
    return (
      <Table>
        <TableCaption>A list of your recent waiters.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataArray.map((item, idx) => (
            <TableRow key={`item-${idx}`} onClick={(e)=>{router.push(`/waitlists/${item.id}`)}} className="hover:cursor-pointer">
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className="text-right">{item.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total waiters</TableCell>
            <TableCell className="text-right">{dataArray.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  