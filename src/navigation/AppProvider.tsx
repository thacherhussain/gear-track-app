import React, { FC, ReactNode, useState, createContext } from 'react'

export const AppContext = createContext<any>(null)

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = (props) => {
  const { children } = props
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}
