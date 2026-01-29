// Debug utilities for authentication
import { getStoredAuth, isAuthenticated } from './auth'

export function debugAuth() {
  console.log('=== AUTH DEBUG ===')
  
  // Check what's in storage
  const sessionToken = sessionStorage.getItem('adminToken')
  const sessionUser = sessionStorage.getItem('adminUser')
  const localToken = localStorage.getItem('adminToken')
  const localUser = localStorage.getItem('adminUser')
  
  console.log('Session Storage:', { token: sessionToken, user: sessionUser })
  console.log('Local Storage:', { token: localToken, user: localUser })
  
  // Check auth functions
  const storedAuth = getStoredAuth()
  const authenticated = isAuthenticated()
  
  console.log('getStoredAuth():', storedAuth)
  console.log('isAuthenticated():', authenticated)
  
  if (storedAuth && storedAuth.user) {
    console.log('User role:', storedAuth.user.role)
    console.log('Role check (lowercase):', storedAuth.user.role.toLowerCase())
    console.log('Is admin?:', storedAuth.user.role.toLowerCase() === 'admin')
  }
  
  console.log('=== END DEBUG ===')
  
  return {
    sessionStorage: { token: sessionToken, user: sessionUser },
    localStorage: { token: localToken, user: localUser },
    storedAuth,
    authenticated
  }
}

// Function to manually set auth for testing
export function setTestAuth() {
  const testUser = {
    id: 'test-admin-id',
    email: 'admin@test.com',
    name: 'Test Admin',
    role: 'admin'
  }
  
  const testToken = 'test-token-123'
  
  localStorage.setItem('adminToken', testToken)
  localStorage.setItem('adminUser', JSON.stringify(testUser))
  
  console.log('Test auth set in localStorage')
  debugAuth()
}