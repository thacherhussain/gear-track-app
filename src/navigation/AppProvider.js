import React, { useState } from 'react'

export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}
