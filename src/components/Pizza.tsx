import React from 'react'

import { useSetAppState } from './AppState'

import PizzaCss from './Pizza.module.css'

interface IPizza {
  id: number
  name: string
  description: string
  price: number
}

interface IProps {
  pizza: IPizza
}

const Pizza: React.FC<IProps> = ({ pizza }) => {
  const setAppState = useSetAppState()

  const onClickAddToCart = () => {
    setAppState((appState) => {
      const itemFound = !!appState.cart.items.find(item => item.id === pizza.id)

      return {
        ...appState,
        cart: {
          ...appState.cart,
          items: itemFound ? appState.cart.items.map(item => item.id !== pizza.id ? item : { ...item, quantity: item.quantity + 1 }) : [
            ...appState.cart.items,
            { id: pizza.id, name: pizza.name, price: pizza.price, quantity: 1 }
          ]
        },
      }
    })
  }

  return (
    <li className={PizzaCss.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button onClick={onClickAddToCart}>Add to cart</button>
    </li>
  )
}

export default Pizza
