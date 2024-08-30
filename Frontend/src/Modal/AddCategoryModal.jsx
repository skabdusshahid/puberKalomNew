import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddCategoryModal.style.css'; 
import Http from '../Http';

// Ensure the app element is set for accessibility reasons
Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element

const AddCategoryModal = ({ isOpen, onRequestClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [subcategories, setSubcategories] = useState([]);

    const handleAddSubcategory = () => {
        if (subcategoryName) {
            setSubcategories([...subcategories, { name: subcategoryName }]);
            setSubcategoryName('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryData = { name: categoryName, subcategories };

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
                return;
            }

            const result = await response.json();
            alert(result.message);
            setCategoryName('');
            setSubcategories([]);
            onRequestClose(); // Close the modal after submission
        } catch (error) {
            console.error('Error submitting category:', error.message);
            alert('Error submitting category: ' + error.message);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Category Modal"
            className="add-category-modal"
            overlayClassName="add-category-overlay"
        >
            <div className="add-category-modal-content">
                <h2>Add New Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Category Name:</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Enter category name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Subcategory Name:</label>
                        <input
                            type="text"
                            value={subcategoryName}
                            onChange={(e) => setSubcategoryName(e.target.value)}
                            placeholder="Enter subcategory name"
                        />
                        <button type="button" onClick={handleAddSubcategory}>
                            Add Subcategory
                        </button>
                    </div>
                    <div className="form-group">
                        <label>Subcategories:</label>
                        <ul>
                            {subcategories.map((subcat, index) => (
                                <li key={index}>{subcat.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="modal-buttons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onRequestClose}>Close</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddCategoryModal;
