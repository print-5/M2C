"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoginPage from "@/components/Checker/Login/Login"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const handleLogin = (id: string) => {
    setIsLoggedIn(true)
    // Store checker ID in localStorage or session storage if needed
    localStorage.setItem('checkerID', id)
    // Redirect to dashboard
    router.push('/checker/dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('checkerID')
    // Stay on login page
  }

  return <LoginPage onLogin={handleLogin} />
}
