import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './EditCategoryModal.style.css'; // Import the CSS file for custom styles
import Http from '../Http';

const EditPageModal = ({ isOpen, onRequestClose, page, onUpdate }) => {
    // Add the 'isOpen' prop to the props validation
    EditPageModal.propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        page: PropTypes.object.isRequired,
        onUpdate: PropTypes.func.isRequired,
    };
    const [title, setTitle] = useState(page.name);
    const [content, setContent] = useState(page.description);

    const handleSave = async () => {
        try {
            const response = await fetch(`${Http}/pages/${page._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: title, description: content }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                alert('Error updating page: ' + errorText);
                return;
            }

            alert('Page updated successfully');
            onRequestClose();
            onUpdate();
        } catch (error) {
            console.error('Error updating page:', error.message);
            alert('Error updating page: ' + error.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="Modal" overlayClassName="Overlay">
            <h2>Edit Page</h2>
            <div className="form-group">
                <label>Page Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-control"
                />
            </div>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default EditPageModal;
