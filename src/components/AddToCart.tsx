import React from 'react'

import { ICartItem, useAppDispatch } from './AppState'

export interface IAddToCartProps {
  addToCart: (item: ICartItem) => void
}

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
