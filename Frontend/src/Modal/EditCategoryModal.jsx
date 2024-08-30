import React, { useState } from 'react';
import Modal from 'react-modal';
import './EditCategoryModal.style.css'; 

import Http from '../Http';

const EditCategoryModal = ({ isOpen, onRequestClose, category, onUpdate }) => {
    const [name, setName] = useState(category.name);
    const [subcategories, setSubcategories] = useState(category.subcategories);

    const handleSave = async () => {
        try {
            const response = await fetch(`${Http}/pages/categories/${category._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, subcategories }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                alert('Error updating category: ' + errorText);
                return;
            }

            alert('Category updated successfully');
            onRequestClose();
            onUpdate();
        } catch (error) {
            console.error('Error updating category:', error.message);
            alert('Error updating category: ' + error.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="Modal" overlayClassName="Overlay">
            <h2>Edit Category</h2>
            <div className="form-group">
                <label>Category Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Subcategories</label>
                <ul className="list-group">
                    {subcategories.map((subcat, index) => (
                        <li key={subcat._id} className="list-group-item">
                            <input
                                type="text"
                                value={subcat.name}
                                onChange={(e) => {
                                    const updatedSubcategories = [...subcategories];
                                    updatedSubcategories[index].name = e.target.value;
                                    setSubcategories(updatedSubcategories);
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default EditCategoryModal;
