import React, { createRef } from 'react'
import { FiShoppingCart } from 'react-icons/fi'

import { AppStateContext } from './AppState'

import CartCss from './Cart.module.css'

interface IProps {}

interface IState {
  isOpen: boolean
}

class Cart extends React.Component<IProps, IState> {
  #containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props)

    this.state = {
      isOpen: false,
    }

    this.#containerRef = createRef()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)   
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  
  handleClickOutside = (event: MouseEvent) => {
    if (!this.#containerRef.current || this.#containerRef.current.contains(event.target as Node)) {
      return
    }

    this.setState({
      isOpen: false
    })
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
            <div ref={this.#containerRef} className={CartCss.cartContainer}>
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
