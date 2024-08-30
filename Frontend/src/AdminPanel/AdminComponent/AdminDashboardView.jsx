import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import EditFormModal from '../../Modal/EditFormModal';
import ViewFormModal from '../../Modal/ViewFormModal';
import './AdminView.style.css';
import Http from '../../Http';

const AdminDashboardView = () => {
  const [forms, setForms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedContentId, setExpandedContentId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('');

  

  useEffect(() => {
    fetchForms(page);
    fetchCategories();
  }, [page, dateFilter, selectedCategory]);

  const fetchForms = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL(`${Http}/admin-dashboard`);
      url.searchParams.append('page', page);
      if (dateFilter) {
        url.searchParams.append('date', dateFilter);
      }
      if (selectedCategory) {
        url.searchParams.append('category', selectedCategory);
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setForms(data.forms);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${Http}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (form) => {
    setCurrentForm(form);
    setIsEditModalOpen(true);
  };

  const handleView = (form) => {
    setCurrentForm(form);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (formId) => {
    try {
      const response = await fetch(`${Http}/admin-dashboard/${formId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchForms(page);
      } else {
        throw new Error('Error deleting form');
      }
    } catch (error) {
      alert(`Error deleting form: ${error.message}`);
    }
  };

  const toggleContent = (id) => {
    setExpandedContentId(expandedContentId === id ? null : id);
  };

  const truncateContent = (content) => {
    const strippedContent = content.replace(/<[^>]+>/g, '');
    return strippedContent.length > 88
      ? strippedContent.substring(0, strippedContent.indexOf(' ', 88)) + '...'
      : strippedContent;
  };

  const handleUpdate = (updatedForm) => {
    setForms(forms.map((form) => (form._id === updatedForm._id ? updatedForm : form)));
    setIsEditModalOpen(false);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const closeViewModal = () => setIsViewModalOpen(false);

  const handleIsBreakingToggle = async (form) => {
    const updatedIsBreaking = !form.isBreaking;
    const updatedForm = { ...form, isBreaking: updatedIsBreaking };

    try {
      const response = await fetch(`${Http}/admin-dashboard/${form._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedForm),
      });

      if (response.ok) {
        setForms(forms.map(f => f._id === form._id ? { ...f, isBreaking: updatedIsBreaking } : f));
      } else {
        throw new Error('Error updating form');
      }
    } catch (error) {
      alert(`Error updating form: ${error.message}`);
    }
  };

  const getPictureUrl = (picturePath) => {
    if (!picturePath) return null;
    return picturePath.startsWith('http') ? picturePath : `${Http}${picturePath}`;
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="admin-dashboard-view">
      <h1>Admin Dashboard View</h1>

      <div className="filter-container">
        <label>Filter by Date:</label>
        <input
          type="date"
          value={dateFilter}
          onChange={handleDateFilterChange}
        />
        <label>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryFilterChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : forms.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Content</th>
                <th>Picture</th>
                <th>Tags</th>
                <th>Reporter Details</th>
                <th>Actions</th>
                <th>Is Breaking</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form._id}>
                  <td>{form.title}</td>
                  <td>
                    <div>
                      {form.category}
                      {form.subcategory && (
                        <div style={{ marginLeft: '10px', fontSize: '0.9em', color: '#666' }}>
                          <em>{form.subcategory}</em>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      {expandedContentId === form._id ? (
                        <div>
                          <div dangerouslySetInnerHTML={{ __html: form.content }} />
                          <span
                            onClick={() => toggleContent(form._id)}
                            className="content-toggle"
                          >
                            {' '}See Less
                          </span>
                        </div>
                      ) : (
                        <span>
                          <span dangerouslySetInnerHTML={{ __html: truncateContent(form.content) }} />
                          {form.content.replace(/<[^>]+>/g, '').length > 88 && (
                            <span
                              onClick={() => toggleContent(form._id)}
                              className="content-toggle"
                            >
                              {' '}See More
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    {form.picture ? (
                      <img
                        src={getPictureUrl(form.picture)}
                        alt="Uploaded"
                        className="picture-preview"
                      />
                    ) : (
                      'No picture'
                    )}
                  </td>
                  <td>{form.tags.join(', ')}</td>
                  <td>
                    <div>
                      <strong>Reporter:</strong> {form.reporterName}<br />
                      <strong>Location:</strong> {form.location}<br />
                      <strong>Date:</strong> {new Date(form.date).toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <div className="button-group">
                      <button className="icon-button view-button" onClick={() => handleView(form)}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="icon-button edit-button" onClick={() => handleEdit(form)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="icon-button delete-button" onClick={() => handleDelete(form._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="form-group" style={{ display: "inline-flex" }}>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={form.isBreaking}
                          onChange={() => handleIsBreakingToggle(form)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {currentForm && (
        <EditFormModal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          form={currentForm}
          onUpdate={handleUpdate}
        />
      )}

      
      {currentForm && (
        <ViewFormModal
          isOpen={isViewModalOpen}
          onRequestClose={closeViewModal}
          form={currentForm}
        />
      )}
    </div>
  );
};

export default AdminDashboardView;
