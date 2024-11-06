"use client";

import { usePathname, useRouter } from "next/navigation";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext(null);

const LOCAL_STORAGE_KEY = 'is-logged-in'
const LOGIN_REDIRECT_URL = '/'
const LOGOUT_REDIRECT_URL = '/login'
const LOGIN_REQUIRED_URL = '/login'

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter() 
  const pathName = usePathname() 
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedAuthStatus) {
        const storedAuthStatusInt = parseInt(storedAuthStatus)
        setIsAuthenticated(storedAuthStatusInt === 1)
    }
  }, [])

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem(LOCAL_STORAGE_KEY, "1")
    const searchParams = new URLSearchParams(window.location.search);
    const nextUrl = searchParams.get('next') || LOGIN_REDIRECT_URL;
    router.replace(nextUrl)
  
  }
  const logout = () => {
    setIsAuthenticated(false)
    localStorage.setItem(LOCAL_STORAGE_KEY, "0")
    router.replace(LOGOUT_REDIRECT_URL)
  }
  const loginRequired = () => {
    setIsAuthenticated(false)
    localStorage.setItem(LOCAL_STORAGE_KEY, "0")
    let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathName}`
    if (loginWithNextUrl === pathName){
        loginWithNextUrl = `${LOGIN_REQUIRED_URL}`
    }
    router.replace(loginWithNextUrl)
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loginRequired }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
