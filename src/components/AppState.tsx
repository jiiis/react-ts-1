import React, { createContext, useContext, useReducer } from 'react'

interface ICartItem {
  id: number
  name: string
  price: number
}

interface IAppState {
  cart: {
    items: (ICartItem & { quantity: number })[]
  }
}

const appStateDefaultValue: IAppState = {
  cart: {
    items: [],
  },
}

export const AppStateContext = createContext(appStateDefaultValue)

export const AppDispatchContext = createContext<React.Dispatch<IAddToCartAction> | undefined>(undefined)

interface IAction<T> {
  type: T
}

interface IAddToCartAction extends IAction<'ADD_TO_CART'> {
  payload: {
    item: ICartItem
  }
}

const appReducer = (appState: IAppState, action: IAddToCartAction) => {
  const itemToAdd = action.payload.item

  if (action.type === 'ADD_TO_CART') {
    const itemFound = !!appState.cart.items.find((item) => item.id === itemToAdd.id)
   
    return {
      ...appState,
      cart: {
        ...appState.cart,
        items: itemFound
          ? appState.cart.items.map((item) =>
              item.id !== itemToAdd.id
                ? item
                : { ...item, quantity: item.quantity + 1 }
            )
          : [
              ...appState.cart.items,
              {
                ...itemToAdd,
                quantity: 1,
              },
            ],
      },
    }
  }

  return appState
}

export const useAppDispatch = () => {
  const appDispatch = useContext(AppDispatchContext)

  if (!appDispatch) {
    throw new Error(
      'useAppDispatch was called outside of the AppDispatchContext provider!'
    )
  }

  return appDispatch
}

const AppStateProvider: React.FC = ({ children }) => {
  const [appState, appDispatch] = useReducer(appReducer, appStateDefaultValue)

  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={appDispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export default AppStateProvider
