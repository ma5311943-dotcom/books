import React, { useRef } from "react";
import { ourBestSellersStyles as styles } from "../assets/dummystyles";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import obsbooks from "../assets/dummydata";
import { useCart } from "../cartContext/CartContext";
const OurBestSellers = () => {
  const scrollRef = useRef(null);
  const { cart, dispatch } = useCart();
  const inCart = (id) => {
    return cart?.items?.some((item) => item.id === id);
  };
  const getQty = (id) => {
    return cart?.items?.find((item) => item.id === id)?.quantity || 0;
  };
  const handleAdd = (book) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...book, quantity: 1 },
    });
  };
  const handleInc = (id) => {
    dispatch({ type: "INCREMENT", payload: { id } });
  };
  const handledec = (id) => {
    dispatch({ type: "DECREMENT", payload: { id } });
  };
  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          {/* header */}
          <div className={styles.headerWrapper}>
            <div className={styles.headerText}>
              <h1 className={styles.title}>
                <span className={styles.gradientText}>Curated Excellence</span>
              </h1>
              <p className={styles.subtitle}>Top rated by our readers</p>
            </div>

            <div className={styles.navWrapper}>
              <div className={styles.navLine} />
              <div className={styles.navButtons}>
                <button onClick={scrollLeft} className={styles.navBtn}>
                  <ChevronLeft className={styles.navIcon} size={20} />
                </button>
                <button onClick={scrollRight} className={styles.navBtn}>
                  <ChevronRight className={styles.navIcon} size={20} />
                </button>
              </div>
            </div>
          </div>
          {/* books section */}
          <div className={styles.scrollContainer} ref={scrollRef}>
            {obsbooks.map((book, index) => (
              <div key={book.id} className={styles.card(index)}>
                <div className={styles.cardInner}>
                  <div className="space-y-3 md:space-y-4">
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 md:h-5 md:w-5 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                    <div className={styles.bookInfo}>
                      <h2 className={styles.bookTitle}>{book.title}</h2>
                      <p className={styles.bookAuthor}>{book.author}</p>
                    </div>
                    <p className={styles.bookDesc}>
                      Discover an unforgettable journey through pages filled
                      with wisdom, adventure, and inspiration. This carefully
                      curated selection offers readers a transformative
                      experience.
                    </p>
                  </div>
                  {/* add controls like add to cart */}
                  <div className={styles.cartControls}>
                    <div className={styles.priceQtyWrapper}>
                      <span className={styles.price}>
                        &#8377;{Number(book.price).toFixed(2)}
                        {book.id && inCart(book.id) ? (
                          <div className="flex mt-3 items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-sm">
                            <button
                              className={styles.qtyBtn}
                              onClick={() => handledec(book.id)}
                            >
                              <Minus size={18} />
                            </button>

                            <span className={styles.qtyText}>
                              {getQty(book.id)}
                            </span>
                            <button
                              className={styles.qtyBtn}
                              onClick={() => handleInc(book.id)}
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAdd(book)}
                            className={`${styles.addButton} relative mt-3`}
                          >
                            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                            <span>Add To Collection</span>
                          </button>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <img src={book.image} className={styles.bookImage} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurBestSellers;
