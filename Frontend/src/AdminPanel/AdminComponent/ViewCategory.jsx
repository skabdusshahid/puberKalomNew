import React, { useState, useEffect } from 'react';
import './ViewCategory.style.css'; // Import the CSS file for custom styles
import AdminLayout from '../../Layout/AdminLayout';
import EditCategoryModal from '../../Modal/EditCategoryModal'; // Import the EditCategoryModal component
import AddCategoryModal from '../../Modal/AddCategoryModal'; // Import the AddCategoryModal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import icons
import {  useNavigate } from 'react-router-dom';
import CategoryWiseView from './CategoryWiseView';
import Http from '../../Http';

const ViewCategory = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); // To hold the category data for editing
    const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false); // Manage Add Category Modal state
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`${Http}/categories`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            setError(`Error fetching categories: ${error.message}`);
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setEditingCategoryId(category._id);
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            const response = await fetch(`${Http}/categories/${categoryId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                alert(`Error deleting category: ${errorText}`);
                return;
            }

            alert('Category deleted successfully');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error.message);
            alert(`Error deleting category: ${error.message}`);
        }
    };

    const closeEditModal = () => {
        setEditingCategoryId(null);
        setSelectedCategory(null);
    };

    const openAddCategoryModal = () => {
        setAddCategoryModalOpen(true);
    };

    const closeAddCategoryModal = () => {
        setAddCategoryModalOpen(false);
    };

    return (
        <AdminLayout>
            <div className="container view-category">
                <h1 className="my-4">Manage Categories</h1>
                <button className="btn btn-primary mb-3" onClick={openAddCategoryModal}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Category
                </button>
                {isLoading ? (
                    <p>Loading categories...</p>
                ) : error ? (
                    <p className="text-danger">Error: {error}</p>
                ) : (
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th className="actions-column">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <tr key={category._id}>
                                                <td onClick={()=>navigate(`/viewcategories/${category._id}`)}>{category.name}</td>
                                                <td className="actions-column">
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="text-secondary me-2 icon"
                                                        onClick={() => handleEditCategory(category)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="text-danger icon"
                                                        onClick={() => handleDeleteCategory(category._id)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2">No categories found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Modal for editing the category */}
                {selectedCategory && (
                    <EditCategoryModal
                        isOpen={editingCategoryId !== null}
                        onRequestClose={closeEditModal}
                        category={selectedCategory}
                        onUpdate={fetchCategories} // Refresh categories after update
                    />
                )}

                {/* Modal for adding a new category */}
                {addCategoryModalOpen && (
                    <AddCategoryModal
                        isOpen={addCategoryModalOpen}
                        onRequestClose={closeAddCategoryModal}
                        onAddCategory={fetchCategories} // Refresh categories after adding
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default ViewCategory;
