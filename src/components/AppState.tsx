import React, { createContext, useContext, useEffect, useReducer } from 'react'

interface ICartItem {
  id: number
  name: string
  price: number
}

interface ICart {
  items: (ICartItem & { quantity: number })[]
}

interface IAppState {
  cart: ICart
}

const appStateDefaultValue: IAppState = {
  cart: {
    items: [],
  },
}

export const AppStateContext = createContext(appStateDefaultValue)

export const AppDispatchContext =
  createContext<React.Dispatch<IAddToCartAction> | undefined>(undefined)

interface IAction<T> {
  type: T
}

interface IInitCartAction extends IAction<'INIT_CART'> {
  payload: {
    cart: ICart
  }
}

interface IAddToCartAction extends IAction<'ADD_TO_CART'> {
  payload: {
    item: ICartItem
  }
}

const appReducer = (
  appState: IAppState,
  action: IInitCartAction | IAddToCartAction
) => {
  switch (action.type) {
    case 'INIT_CART':
      const cart = action.payload.cart  

      return {
        ...appState,
        cart
      }
    case 'ADD_TO_CART':
      const itemToAdd = action.payload.item
      const itemFound = !!appState.cart.items.find(
        (item) => item.id === itemToAdd.id
      )

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
    default:
      return appState
  }
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

  useEffect(() => {
    const cartJson = window.localStorage.getItem('cart')

    if (!cartJson) {
      return
    }

    try {
      const cart = JSON.parse(cartJson) as ICart

      appDispatch({
        type: 'INIT_CART',
        payload: { cart }
      })
    } catch (error) {
      console.error('Failed to parse cart from local storage!')
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(appState.cart))
  }, [appState.cart])

  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={appDispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export default AppStateProvider
