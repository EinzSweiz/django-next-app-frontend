"use client"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "../authProvider"
import  NavLinks from "./NavLinks"
import { BrandLink } from "./BrandLink"

export default function MobileNavbar({className}) {
    const auth = useAuth();    
    return (
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
    )
}
