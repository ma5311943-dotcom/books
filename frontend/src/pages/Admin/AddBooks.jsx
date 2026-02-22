import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { styles } from '../../assets/Admin/dummyStyles';
import { Upload, Star, PlusCircle, CheckCircle } from 'lucide-react';

const AddBooks = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        category: '',
        description: '',
        rating: 4
    });
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });

    const showToast = (message, type) => {
        setToast({ visible: true, message, type });
        setTimeout(() => setToast({ visible: false, message: '', type: '' }), 3000);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return showToast("Please upload an image", "error");

        setLoading(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('author', formData.author);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('rating', formData.rating);
        data.append('image', image);

        try {
            const response = await fetch('http://localhost:4000/api/book', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: data
            });

            const resData = await response.json();
            if (resData.success) {
                showToast("Book added successfully!", "success");
                setFormData({ title: '', author: '', price: '', category: '', description: '', rating: 4 });
                setImage(null);
            } else {
                showToast(resData.message || "Failed to add book", "error");
            }
        } catch (error) {
            showToast("Server error", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.addBooksPage}>
            {toast.visible && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {toast.type === 'success' ? <CheckCircle /> : <PlusCircle />}
                    <span className="font-medium">{toast.message}</span>
                </div>
            )}

            <div className={styles.addBooksContainer}>
                <div className={styles.headerContainer}>
                    <div>
                        <h1 className={styles.headerTitle}>Add New Book</h1>
                        <p className={styles.headerSubtitle}>Expand your library collection with new titles</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.formGrid}>
                        {/* Title */}
                        <div className={styles.formItem}>
                            <label className={styles.formLabel}>Book Title</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter book title"
                                required
                            />
                        </div>

                        {/* Author */}
                        <div className={styles.formItem}>
                            <label className={styles.formLabel}>Author Name</label>
                            <input
                                type="text"
                                className={styles.formInput}
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                placeholder="Enter author name"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div className={styles.formItem}>
                            <label className={styles.formLabel}>Price ($)</label>
                            <input
                                type="number"
                                className={styles.formInput}
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="0.00"
                                step="0.01"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className={styles.formItem}>
                            <label className={styles.formLabel}>Category</label>
                            <select
                                className={styles.formInput}
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Romance">Romance</option>
                                <option value="Biography">Biography</option>
                            </select>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className={styles.formItem}>
                        <label className={styles.formLabel}>Rating (1-5)</label>
                        <div className={styles.ratingContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`cursor-pointer h-8 w-8 transition-colors ${star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                                        }`}
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className={styles.formItem}>
                        <label className={styles.formLabel}>Description</label>
                        <textarea
                            rows="4"
                            className={styles.formTextarea}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Write a brief overview of the book..."
                            required
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className={styles.formItem}>
                        <label className={styles.formLabel}>Book Cover Image</label>
                        <div className="flex items-center gap-6">
                            <label className="flex flex-col items-center justify-center h-40 w-32 border-2 border-dashed border-[#43C6AC] rounded-xl cursor-pointer hover:bg-emerald-50 bg-gray-50 transition-all">
                                <Upload className="h-8 w-8 text-[#43C6AC] mb-2" />
                                <span className="text-xs text-gray-500 font-medium">Upload Image</span>
                                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                            </label>
                            {image && (
                                <div className={styles.previewContainer}>
                                    <div className={styles.previewImage}>
                                        <img src={URL.createObjectURL(image)} alt="Preview" className={styles.previewImg} />
                                    </div>
                                    <p className="text-[10px] text-emerald-600 font-bold mt-2 uppercase">Image Selected</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.submitContainer}>
                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.submitButton}
                        >
                            {loading ? "Adding Book..." : (
                                <>
                                    <PlusCircle size={20} /> Add Book to Library
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBooks;
