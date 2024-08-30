import { useState, useEffect } from 'react';
import './ViewCategory.style.css'; // Import the CSS file for custom styles
import AdminLayout from '../../Layout/AdminLayout';
//import EditCategoryModal from '../../Modal/EditCategoryModal'; // Import the EditCategoryModal component
//import AddCategoryModal from '../../Modal/AddCategoryModal'; // Import the AddCategoryModal component
import AddPageModal from '../../Modal/AddPageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import icons
import EditPageModal from '../../Modal/EditPageModal';
import Http from '../../Http';

const ViewPages = () => {
    const [pages, setPages] = useState([]);
    const [editingPageId, setEditingPageId] = useState(null);
    const [selectedPage, setSelectedPage] = useState(null); // To hold the page data for editing
    const [addPageModalOpen, setAddPageModalOpen] = useState(false); // Manage Add Page Modal state
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`${Http}/pages`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPages(data);
        } catch (error) {
            setError(`Error fetching pages: ${error.message}`);
            console.error('Error fetching pages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditPage = (page) => {
        setSelectedPage(page);
        setEditingPageId(page._id);
    };

    const handleDeletePage = async (pageId) => {
        try {
            const response = await fetch(`${Http}/pages/${pageId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                alert(`Error deleting page: ${errorText}`);
                return;
            }

            alert('Page deleted successfully');
            fetchPages();
        } catch (error) {
            console.error('Error deleting page:', error.message);
            alert(`Error deleting page: ${error.message}`);
        }
    };

    const closeEditModal = () => {
        setEditingPageId(null);
        setSelectedPage(null);
    };

    const openAddPageModal = () => {
        setAddPageModalOpen(true);
    };

    const closeAddPageModal = () => {
        setAddPageModalOpen(false);
    };

    return (
        <AdminLayout>
            <div className="container view-pages">
                <h1 className="my-4">Manage Pages</h1>
                <button className="btn btn-primary mb-3" onClick={openAddPageModal}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Page
                </button>
                {isLoading ? (
                    <p>Loading pages...</p>
                ) : error ? (
                    <p className="text-danger">Error: {error}</p>
                ) : (
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Page</th>
                                        <th className="actions-column">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.length > 0 ? (
                                        pages.map((page) => (
                                            <tr key={page._id}>
                                                <td>{page.name}</td>
                                                <td className="actions-column">
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="text-secondary me-2 icon"
                                                        onClick={() => handleEditPage(page)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="text-danger icon"
                                                        onClick={() => handleDeletePage(page._id)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2">No pages found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Modal for editing the page */}
                {selectedPage && (
                    <EditPageModal
                        isOpen={editingPageId !== null}
                        onRequestClose={closeEditModal}
                        page={selectedPage}
                        onUpdate={fetchPages} // Refresh pages after update
                    />
                )}

                {/* Modal for adding a new page */}
                {addPageModalOpen && (
                    <AddPageModal
                        isOpen={addPageModalOpen}
                        onRequestClose={closeAddPageModal}
                        onAddPage={fetchPages} // Refresh pages after adding
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default ViewPages;
