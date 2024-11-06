"use client"
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "../authProvider"
import  NavLinks, {NonUserNavLinks}  from "./NavLinks"

function BrandLink({displayName, className}){
    const finalClass = className ? className: "flex items-center gap-2 text-lg font-semibold md:text-base"
   return  <Link
    href="/"
    className={finalClass}
  >
    <Package2 className="h-6 w-6" />
    {displayName ? 
        <span>Saas</span>
        : 
        <span className="sr-only">Saas</span>
    }
  </Link>
}

export default function Navbar({className}) {
    const auth = useAuth();
    const finalClass = className ? className : "sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6";
    
    return (
        <header className={finalClass}>
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <BrandLink displayName={true} />
                {NavLinks.map((link, idx) => {
                    const shouldHide = !auth.isAuthenticated && link.authRequired;
                    return shouldHide ? null : (
                        <Link
                            key={`nav-links-a-${idx}`}
                            href={link.href} 
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <BrandLink displayName={true} className="flex items-center gap-2 text-lg font-semibold" />
                        {NavLinks.map((link, idx) => {
                            const shouldHide = !auth.isAuthenticated && link.authRequired;
                            return shouldHide ? null : (
                                <Link
                                    key={`nav-links-b-${idx}`}
                                    href={link.href}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        {auth.isAuthenticated && 
                            <Link href="/logout" className="hover:text-foreground">
                                Logout
                            </Link>
                        }
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                {auth.isAuthenticated ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                :
                <>
                {NonUserNavLinks.map((link, idx) => {
                    const shouldHide = !auth.isAuthenticated && link.authRequired;
                    return shouldHide ? null : (
                        <Link
                            key={`nav-links-c-${idx}`}
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            {link.label}
                        </Link>
                    );
                })}
                </>
                }
            </div>
        </header>
    );
}
