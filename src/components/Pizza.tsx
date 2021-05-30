import React from 'react'

import { useAppDispatch } from './AppState'

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
  const appDispatch = useAppDispatch()

  const onClickAddToCart = () => {
    appDispatch({
      type: 'ADD_TO_CART',
      payload: {
        item: {
          id: pizza.id,
          name: pizza.name,
          price: pizza.price
        }
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
