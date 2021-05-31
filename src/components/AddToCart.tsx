import React from 'react'

import { ICartItem, useAppDispatch } from './AppState'

export interface IAddToCartProps {
  addToCart: (item: ICartItem) => void
}

// Approach 1 to share functionalities among components.
// Use a higher order component.
export function withAddToCart<OriginalProps extends IAddToCartProps>(
  ChildComponent: React.ComponentType<OriginalProps>
) {
  const AddToCartHOC = (props: Omit<OriginalProps, keyof IAddToCartProps>) => {
    const appDispatch = useAppDispatch()

    const addToCart: IAddToCartProps['addToCart'] = (item) => {
      appDispatch({
        type: 'ADD_TO_CART',
        payload: { item },
      })
    }

    return <ChildComponent {...props as OriginalProps} addToCart={addToCart} />
  }

  return AddToCartHOC
}

// Approach 2 to share functionalities among components.
// Use a render props component.
export const WithAddToCartProps: React.FC<{
  children: (props: IAddToCartProps) => JSX.Element
}> = ({ children }) => {
  const appDispatch = useAppDispatch()

  const addToCart: IAddToCartProps['addToCart'] = (item) => {
    appDispatch({
      type: 'ADD_TO_CART',
      payload: { item },
    })
  }

  return children({ addToCart })
}

// Approach 3 to share functionalities among components.
// Use a custom hook.
export const useAddToCart = () => {
  const appDispatch = useAppDispatch()

  const addToCart: IAddToCartProps['addToCart'] = (item) => {
    appDispatch({
      type: 'ADD_TO_CART',
      payload: { item },
    })
  }

  return addToCart
}