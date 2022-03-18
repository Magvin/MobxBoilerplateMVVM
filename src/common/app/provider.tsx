import React, { useContext } from "react"

const AppContext = React.createContext<Common.IApplication>(null as any)

export const AppProvider: React.FC<{ application: Common.IApplication }> = ({ children, application }) => {
  return <AppContext.Provider value={application}>{children}</AppContext.Provider>
}

export function useApplication(application?: Common.IApplication) {
  const app = useContext(AppContext)
  return application || app
}
