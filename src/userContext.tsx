/**
 * @author Sai
 * @created 2024-10-06 11:28a.m.
 * @description
 */
import React from 'react'

type UserContextProps = {
  hasCBHAccess: boolean
  hasHRAccess: boolean
  hasEmpAccess: boolean
}

type UserProviderProps = {
  children: React.ReactNode
}

export const UserContext = React.createContext<UserContextProps | null>(null)

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <>{children}</>
}
