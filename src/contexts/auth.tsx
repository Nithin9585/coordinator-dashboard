// src/contexts/auth.tsx
import React, { createContext, useContext } from 'react'
import { Auth } from 'firebase/auth'
import { auth } from '@/firebase' // Your initialized firebase auth instance

interface AuthContextValue {
  auth: Auth
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context.auth
}
