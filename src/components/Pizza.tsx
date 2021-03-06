import React from 'react'

import { IPizza } from '../types'
import { IAddToCartProps, withAddToCart } from './AddToCart'

import PizzaCss from './Pizza.module.css'

interface IProps extends IAddToCartProps {
  pizza: IPizza
}

const Pizza: React.FC<IProps> = ({ pizza, addToCart }) => {
  return (
    <li className={PizzaCss.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button onClick={addToCart.bind(null, pizza)}>Add to cart</button>
    </li>
  )
}

export default withAddToCart(Pizza)
