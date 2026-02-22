import React, { useRef, useState, useEffect } from "react";
import { ourBestSellersStyles as styles } from "../assets/dummystyles";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Loader2,
} from "lucide-react";
import { useCart } from "../cartContext/CartContext";

const OurBestSellers = () => {
  const scrollRef = useRef(null);
  const { cart, addToCart, updateQuantity } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://e-commerce-1-ku99.onrender.com/api/book');
      const data = await response.json();
      if (data.success) {
        // Show top 6 as best sellers
        setBooks(data.books.slice(0, 6));
      }
    } catch (error) {
      console.error("Error fetching best sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const inCart = (id) => {
    return cart?.items?.some((item) => (item.bookId._id || item.bookId) === id);
  };

  const getQty = (id) => {
    return cart?.items?.find((item) => (item.bookId._id || item.bookId) === id)?.quantity || 0;
  };

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

  if (loading) return (
    <div className="py-20 flex justify-center">
      <Loader2 className="animate-spin text-[#43C6AC]" size={40} />
    </div>
  );

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
            {books.map((book, index) => (
              <div key={book._id} className={styles.card(index)}>
                <div className={styles.cardInner}>
                  <div className="space-y-3 md:space-y-4">
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 md:h-5 md:w-5 ${i < book.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className={styles.bookInfo}>
                      <h2 className={styles.bookTitle}>{book.title}</h2>
                      <p className={styles.bookAuthor}>{book.author}</p>
                    </div>
                    <p className={styles.bookDesc + " line-clamp-3"}>
                      {book.description || "Discover an unforgettable journey through pages filled with wisdom, adventure, and inspiration. This carefully curated selection offers readers a transformative experience."}
                    </p>
                  </div>
                  {/* add controls like add to cart */}
                  <div className={styles.cartControls}>
                    <div className={styles.priceQtyWrapper}>
                      <div className="flex flex-col">
                        <span className={styles.price}>
                          ${Number(book.price).toFixed(2)}
                        </span>
                        {inCart(book._id) ? (
                          <div className="flex mt-3 items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-sm border border-emerald-100">
                            <button
                              className={styles.qtyBtn}
                              onClick={() => updateQuantity(book._id, getQty(book._id) - 1)}
                            >
                              <Minus size={18} />
                            </button>

                            <span className={styles.qtyText}>
                              {getQty(book._id)}
                            </span>
                            <button
                              className={styles.qtyBtn}
                              onClick={() => updateQuantity(book._id, getQty(book._id) + 1)}
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(book._id, 1)}
                            className={`${styles.addButton} relative mt-3`}
                          >
                            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                            <span>Add To Collection</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src={`https://e-commerce-1-ku99.onrender.com/uploads/${book.image}`}
                  className={styles.bookImage}
                  alt={book.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurBestSellers;
