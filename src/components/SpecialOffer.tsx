import React from 'react'

import { IPizza } from '../types'
import { IAddToCartProps, withAddToCart } from './AddToCart'

import SpecialOfferCss from './SpecialOffer.module.css'

interface IProps extends IAddToCartProps {
  pizza: IPizza
}

const SpecialOffer: React.FC<IProps> = ({ pizza, addToCart }) => {  
  return (
    <div className={SpecialOfferCss.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button onClick={addToCart.bind(null, pizza)}>Add to cart</button>
    </div>
  )
}

export default withAddToCart(SpecialOffer)
