import React, { useEffect } from 'react'
import { styles } from "../assets/dummystyles"
import { useCart } from '../cartContext/CartContext'
import { ShoppingBag, Trash2, Plus, Minus, BookSearch, Book } from 'lucide-react'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cart, dispatch } = useCart()
  const total = cart.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)

  const getImageSource = (item) => {
    return item.image?.default || item.image
  }

  const incr = (item) => {
    dispatch({ type: "INCREMENT", payload: { id: item.id, source: item.source } })
  }

  const decr = (item) => {
    dispatch({ type: "DECREMENT", payload: { id: item.id, source: item.source } })
  }

  const remove = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id: item.id, source: item.source } })
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <ShoppingBag className={styles.titleIcon} />
            Shopping Cart
          </h1>
          <p className={styles.subtitle}>
            {cart.items.length} item{cart.items.length !== 1 && 's'} in your cart
          </p>
        </div>

        {cart.items.length === 0 ? (
          <div className={styles.emptyCard}>
            <div className={styles.emptyIconWrapper}>
              <ShoppingBag className={styles.emptyIcon} />
            </div>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyDescription}>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/books" className={styles.browseBtn}>
              Browse Books
            </Link>
          </div>
        ) : (
          <div className={styles.cartGrid}>
            <div className={styles.cartItems}>
              {cart.items.map((item) => (
                <div key={`${item.id}-${item.source}`} className={styles.cartItemCard}>
                  <div className={styles.cartItemContent}>
                    <img
                      src={getImageSource(item)}
                      alt={item.title}
                      className={styles.cartItemImage}
                    />
                    <div className="flex-1">
                      <div className={styles.cartItemTop}>
                        <div>
                          <h3 className={styles.itemTitle}>{item.title}</h3>
                          <p className={styles.itemAuthor}>{item.author}</p>
                        </div>
                        <button
                          onClick={() => remove(item)}
                          className={styles.removeBtn}
                        >
                          <Trash2 className={styles.removeIcon} />
                        </button>
                      </div>

                      <div className={styles.quantityPriceWrapper}>
                        <div className={styles.quantityControls}>
                          <div className={styles.quantityBox}>
                            <button onClick={() => decr(item)} className={styles.qBtn}>
                              <Minus className={styles.qIcon} />
                            </button>
                            <span className={styles.quantityValue}>{item.quantity}</span>
                            <button onClick={() => incr(item)} className={styles.qBtn}>
                              <Plus className={styles.qIcon} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={styles.itemTotal}>₹{(item.price * item.quantity).toFixed(2)}</p>
                          <p className={styles.pricePerItem}>₹{item.price} per item</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryBreakdown}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Subtotal</span>
                  <span className={styles.summaryValue}>₹{total.toFixed(2)}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Shipping</span>
                  <span className={styles.summaryShipping}>Free</span>
                </div>
              </div>

              <div className={styles.summaryTotalSection}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total</span>
                  <span className={styles.totalAmount}>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button className={styles.checkoutBtn}>Checkout Now</button>
              <Link to="/books" className={styles.continueBtn}><Book /> Continue Shopping</Link>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
