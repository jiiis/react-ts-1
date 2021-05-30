import React, { createContext, useContext, useState } from 'react'

interface IAppState {
  cart: {
    items: { id: number, name: string, price: number, quantity: number }[]
  }
}

const appStateDefaultValue: IAppState = {
  cart: {
    items: []
  }
}

export const AppStateContext = createContext(appStateDefaultValue)

export const SetAppStateContext = createContext<React.Dispatch<React.SetStateAction<IAppState>> | undefined>(undefined)

export const useSetAppState = () => {
  const setAppState = useContext(SetAppStateContext)

  if (!setAppState) {
    throw new Error('useSetAppState was called outside of the SetAppStateContext provider!')
  }

  return setAppState
}

const AppStateProvider: React.FC = ({ children }) => {
  const [appState, setAppState] = useState(appStateDefaultValue)

  return (
    <AppStateContext.Provider value={appState}>
      <SetAppStateContext.Provider value={setAppState}>
        {children}
      </SetAppStateContext.Provider>
    </AppStateContext.Provider>
  )
}

export default AppStateProvider
