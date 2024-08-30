import React, { useState } from 'react';
import Http from '../../Http';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            alert('Category name cannot be empty');
            return;
        }

        const categoryData = { name: categoryName.trim() };
        setLoading(true);

        try {
            const response = await fetch(`${Http}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                alert('Error submitting category: ' + errorText);
                setLoading(false);
                return;
            }

            const result = await response.json();
            alert(result.message);
            setCategoryName('');
        } catch (error) {
            console.error('Error submitting category:', error.message);
            alert('Error submitting category: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-category">
            <h1>Add New Category</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category Name:</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AddCategory;
