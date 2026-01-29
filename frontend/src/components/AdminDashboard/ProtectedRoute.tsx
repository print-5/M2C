'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getStoredAuth } from '@/lib/auth'
import LoadingSpinner from '@/components/UI/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Wait a bit to ensure storage is ready
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const auth = getStoredAuth()
        
        if (!auth) {
          console.log('ProtectedRoute: No auth found, redirecting to login')
          router.replace('/admin/login')
          return
        }
        
        if (!auth.user || auth.user.role.toLowerCase() !== 'admin') {
          console.log('ProtectedRoute: User is not admin, redirecting to login')
          router.replace('/admin/login')
          return
        }
        
        console.log('ProtectedRoute: Auth successful, user is admin')
        setIsAuthorized(true)
      } catch (error) {
        console.error('ProtectedRoute: Auth check error:', error)
        router.replace('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    // Only run in browser environment
    if (typeof window !== 'undefined') {
      checkAuth()
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null // Will redirect to login
  }

  return <>{children}</>
}