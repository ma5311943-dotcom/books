import React, { useState, useEffect } from "react";
import { homeBooksStyles as styles } from "../assets/dummystyles";
import { useCart } from "../cartContext/CartContext";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  PlusIcon,
  ShoppingCart,
  StarIcon,
  Loader2,
} from "lucide-react";
import { BACKEND_URL } from "../assets/config";

const HomeBooks = () => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/book`);
      const data = await response.json();
      if (data.success) {
        // Take first 4 for the home favorites section
        setBooks(data.books.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching home books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const inCart = (id) => {
    return cart?.items?.find((item) => (item.bookId._id || item.bookId) === id);
  };

  if (loading) return (
    <div className="py-20 flex justify-center">
      <Loader2 className="animate-spin text-[#43C6AC]" size={40} />
    </div>
  );

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className="text-center mb-12">
            <h2 className={styles.heading}>BookSeller Favorites</h2>
            <div className={styles.headingLine} />
          </div>
          <div className={styles.grid}>
            {books.map((book) => {
              const item = inCart(book._id);
              return (
                <div key={book._id} className={styles.bookCard}>
                  <div className={styles.imageWrapper}>
                    <img src={book.image.startsWith('http') ? book.image : `${BACKEND_URL}/uploads/${book.image}`} className={styles.image} alt={book.title} />
                    <div className={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${i < book.rating
                            ? "text-[#43c6ac] fill-[#43c6ac]"
                            : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className={styles.title}>{book.title}</h3>
                  <p className={styles.author}>
                    {book.author} — top selection
                  </p>
                  <p className="text-lg font-bold text-[#43C6AC] mt-2 mb-4">${book.price.toFixed(2)}</p>

                  {item ? (
                    <div className={styles.qtyBox}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(book._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="text-gray-700 font-semibold">{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(book._id, item.quantity + 1)}
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className={styles.addBtn}
                      onClick={() => addToCart(book._id, 1)}
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
