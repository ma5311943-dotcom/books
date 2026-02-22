import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { styles } from '../../assets/Admin/dummyStyles';
import { Trash2, Edit, Search, Filter, BookOpen } from 'lucide-react';

const ListBooks = () => {
    const { token } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/book');
            const data = await response.json();
            if (data.success) {
                setBooks(data.books);
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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            const response = await fetch(`http://localhost:4000/api/book/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setBooks(books.filter(book => book._id !== id));
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? book.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <div className="p-8 text-center font-bold">Loading Library...</div>;

    return (
        <div className={styles.listBooksPage}>
            <div className={styles.listBooksHeader}>
                <h1 className={styles.listBooksTitle}>Library Management</h1>
                <p className={styles.listBooksSubtitle}>View, edit, and manage your bookstore catalog</p>
            </div>

            <div className={styles.controlsContainer}>
                <div className={styles.controlsInner}>
                    <div className={styles.searchContainer}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search by title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <div className={styles.filterGlow}></div>
                        <div className={styles.filterContainer}>
                            <Filter className={styles.filterIcon} size={18} />
                            <select
                                className={styles.filterSelect}
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Romance">Romance</option>
                                <option value="Biography">Biography</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.booksTableContainer}>
                <div className="overflow-x-auto">
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr>
                                <th className={styles.tableHeader}>Book</th>
                                <th className={styles.tableHeader}>Author</th>
                                <th className={styles.tableHeader}>Category</th>
                                <th className={styles.tableHeader}>Price</th>
                                <th className={styles.tableHeader}>Rating</th>
                                <th className={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBooks.length > 0 ? filteredBooks.map((book) => (
                                <tr key={book._id} className={styles.tableRow}>
                                    <td className={styles.tableCell}>
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-10 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                                <img
                                                    src={`http://localhost:4000/uploads/${book.image}`}
                                                    alt={book.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <span className="text-sm font-bold text-gray-900 line-clamp-1">{book.title}</span>
                                        </div>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <span className="text-sm text-gray-600 font-medium">{book.author}</span>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <span className="px-3 py-1 text-xs font-bold uppercase bg-blue-50 text-blue-600 rounded-full">
                                            {book.category}
                                        </span>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <span className="text-sm font-black text-[#2B5876]">${book.price.toFixed(2)}</span>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <div className="flex items-center text-amber-500">
                                            <span className="text-sm font-bold mr-1">{book.rating}</span>
                                            <BookOpen size={14} />
                                        </div>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <div className="flex items-center gap-3">
                                            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 italic">
                                        No books found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListBooks;
