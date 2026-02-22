import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, ShoppingBag, Plus, Minus, Loader2 } from 'lucide-react';
import { useCart } from '../cartContext/CartContext';
import { useSearchParams } from 'react-router-dom';
import { booksPageStyles as s } from '../assets/dummystyles';

const Books = () => {
    const { addToCart } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState("default");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});
    const query = searchParams.get('search') || "";

    const fetchBooks = async () => {
        try {
            const response = await fetch('https://e-commerce-1-ku99.onrender.com/api/book');
            const data = await response.json();
            if (data.success) {
                setBooks(data.books);
                const qtys = {};
                data.books.forEach(b => qtys[b._id] = 1);
                setQuantities(qtys);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const updateQty = (id, delta) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + delta)
        }));
    };

    const filteredBooks = books
        .filter(b => [b.title, b.author, b.category].some(x => x?.toLowerCase().includes(query.toLowerCase())))
        .sort((a, b) =>
            sortBy === "price-low" ? a.price - b.price :
                sortBy === "price-high" ? b.price - a.price :
                    sortBy === "title-asc" ? a.title.localeCompare(b.title) :
                        sortBy === "title-desc" ? b.title.localeCompare(a.title) :
                            0
        );

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <Loader2 className="animate-spin text-[#43C6AC]" size={48} />
        </div>
    );

    return (
        <div className={s.container + " pt-16"}>
            <div className={s.innerContainer}>
                <div className="text-center mb-12">
                    <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                        <ShoppingBag className="h-10 w-10 text-[#43C6AC]" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1A237E] to-[#43C6AC] bg-clip-text text-transparent">Discover Books</h1>
                    <p className="text-gray-500 font-medium mt-2">Find your next literary adventure in our catalog</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center mb-16 max-w-3xl mx-auto bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title, author or category..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#43C6AC]/30 text-sm font-medium"
                            value={query}
                            onChange={(e) => setSearchParams(e.target.value ? { search: e.target.value } : {})}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select
                            className="flex-1 md:w-44 px-4 py-3 bg-gray-50 rounded-xl border-0 text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-[#43C6AC]/30 cursor-pointer outline-none"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Default Sorting</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="title-asc">Title: A - Z</option>
                            <option value="title-desc">Title: Z - A</option>
                        </select>
                        <div className="hidden lg:flex items-center gap-2 px-4 py-3 bg-[#43C6AC]/10 rounded-xl whitespace-nowrap">
                            <span className="text-xs font-bold text-[#43C6AC] uppercase tracking-tight">
                                {filteredBooks.length} Books
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredBooks.map((b) => (
                        <div key={b._id} className="group bg-white rounded-[2rem] p-5 shadow-sm border border-gray-50 hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 flex flex-col h-full">
                            <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-500">
                                <img
                                    src={`https://e-commerce-1-ku99.onrender.com/uploads/${b.image}`}
                                    alt={b.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                    <span className="text-[10px] font-bold">{b.rating}</span>
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="px-3 py-1 bg-[#2B5876]/90 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                                        {b.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 px-1">
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[#43C6AC] transition-colors">{b.title}</h3>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">by {b.author}</p>

                                <p className="text-xs text-gray-500 line-clamp-2 mt-4 flex-1 leading-relaxed font-medium">{b.description}</p>

                                <div className="mt-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-[#2B5876]">${b.price.toFixed(2)}</span>
                                        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                                            <button
                                                onClick={() => updateQty(b._id, -1)}
                                                className="p-1 hover:bg-white rounded-lg transition-all"
                                            >
                                                <Minus size={14} className="text-gray-400" />
                                            </button>
                                            <span className="w-8 text-center text-xs font-bold text-gray-700">{quantities[b._id] || 1}</span>
                                            <button
                                                onClick={() => updateQty(b._id, 1)}
                                                className="p-1 hover:bg-white rounded-lg transition-all"
                                            >
                                                <Plus size={14} className="text-emerald-500" />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => addToCart(b._id, quantities[b._id] || 1)}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <ShoppingCart className="h-4 w-4" /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredBooks.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[4rem] shadow-sm border border-gray-50 mt-10">
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Search size={40} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">No books found</h2>
                        <p className="text-gray-500 font-medium">We couldn't find any books matching "{query}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Books;
