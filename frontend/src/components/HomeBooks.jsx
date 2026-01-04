import React from "react";
import { homeBooksStyles as styles } from "../assets/dummystyles";
import { useCart } from "../cartContext/CartContext";
import { Link } from "react-router-dom";
import { hbbooks } from "../assets/dummydata";
import {
  ArrowRight,
  Minus,
  PlusIcon,
  ShoppingCart,
  StarIcon,
} from "lucide-react";
const HomeBooks = () => {
  const { cart, dispatch } = useCart();
  const inCart = (id) => {
    return cart?.items?.find((item) => item.id === id);
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
  const handleDec = (id) => {
    dispatch({ type: "DECREMENT", payload: { id } });
  };
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className="text-center mb-12">
            <h2 className={styles.heading}>BookSeller Favorits</h2>
            <div className={styles.headingLine} />
          </div>
          <div className={styles.grid}>
            {hbbooks.map((book) => {
              const item = inCart(book.id);
              return (
                <div key={book.id} className={styles.bookCard}>
                  <div className={styles.imageWrapper}>
                    <img src={book.image} className={styles.image} />
                    <div className={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < book.rating
                              ? "text-[#43c6ac] fill-[#43c6ac]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className={styles.title}>{book.title}</h3>
                  <p className={styles.author}>
                    {book.author} best author in this week
                  </p>
                  <span className={styles.actualPrice}>₹{book.price}</span>
                  {item ? (
                    <div className={styles.qtyBox}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => handleDec(book.id)}
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="text-gray-700">{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => handleInc(book.id)}
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className={styles.addBtn}
                      onClick={() => handleAdd(book)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span> Add To Cart</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.viewBtnWrapper}>
            <Link to="/books" className={styles.viewBtn}>
              <span>View All Books</span>
              <ArrowRight className={styles.viewIcon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBooks;
