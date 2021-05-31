import React from 'react'

import AppStateProvider from './AppState'
import Pizza from './Pizza'
import SpecialOffer from './SpecialOffer'
import Cart from './Cart'

import pizzas from '../data/pizzas.json'

import AppCss from './App.module.css'

import PizzaSvg from '../svg/pizza.svg'

const App = () => {
  const specialOfferPizza = pizzas.find(pizza => !!pizza.specialOffer)

  return (
    <AppStateProvider>
      <div className={AppCss.container}>
        <div className={AppCss.header}>
          <PizzaSvg width={120} height={120} />
          <div className={AppCss.siteTitle}>Nasty pizzas</div>
          <Cart />
        </div>
        {specialOfferPizza && <SpecialOffer pizza={specialOfferPizza} />}
        <ul className={AppCss.pizzaList}>
          {pizzas.map((pizza) => (
            <Pizza key={pizza.id} pizza={pizza} />
          ))}
        </ul>
      </div>
    </AppStateProvider>
  )
}

export default App
