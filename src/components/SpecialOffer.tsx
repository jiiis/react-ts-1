import React from 'react'

import { IPizza } from '../types'
import { WithAddToCartProps } from './AddToCart'

import SpecialOfferCss from './SpecialOffer.module.css'

interface IProps {
  pizza: IPizza
}

const SpecialOffer: React.FC<IProps> = ({ pizza }) => {
  return (
    <div className={SpecialOfferCss.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <WithAddToCartProps>
        {({ addToCart }) => {
          return (
            <button onClick={addToCart.bind(null, pizza)}>Add to cart</button>
          )
        }}
      </WithAddToCartProps>
    </div>
  )
}

export default SpecialOffer
