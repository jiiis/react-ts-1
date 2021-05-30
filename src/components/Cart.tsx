import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'

import { AppStateContext } from './AppState'

import CartCss from './Cart.module.css'

interface IProps {}

interface IState {
  isOpen: boolean
}

class Cart extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  render() {
    return (
      <AppStateContext.Consumer>
        {(appState) => {
          const itemCount = appState.cart.items.reduce(
            (count, item) => count + item.quantity,
            0
          )

          return (
            <div className={CartCss.cartContainer}>
              <button
                type="button"
                className={CartCss.button}
                onClick={() => {
                  this.setState({
                    isOpen: !this.state.isOpen,
                  })
                }}
              >
                <FiShoppingCart />
                <span>{itemCount} pizza(s)</span>
              </button>
              <div
                className={CartCss.cartDropDown}
                style={{
                  display: this.state.isOpen ? 'block' : 'none',
                }}
              >
                <ul>
                  {appState.cart.items.map((item) => (
                    <li key={item.id}>
                      {item.name} ({item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }}
      </AppStateContext.Consumer>
    )
  }
}

export default Cart
