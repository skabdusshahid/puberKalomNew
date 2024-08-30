import React from 'react';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for ReactQuill
import '../AdminPanel/AdminComponent/AdminView.style.css'; // Adjust the path if needed
import Http from '../Http';

const EditFormModal = ({ isOpen, onRequestClose, form, onUpdate }) => {
    const [title, setTitle] = React.useState(form.title);
    const [category, setCategory] = React.useState(form.category);
    const [subcategory, setSubcategory] = React.useState(form.subcategory || '');
    const [content, setContent] = React.useState(form.content);
    const [tags, setTags] = React.useState(form.tags.join(', '));
    const [picture, setPicture] = React.useState(form.picture);
    const [reporterName, setReporterName] = React.useState(form.reporterName || '');
    const [location, setLocation] = React.useState(form.location || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedForm = {
            title,
            category,
            subcategory,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            picture,
            reporterName,
            location
        };

        try {
            const response = await fetch(`${Http}/${form._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedForm),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                alert('Error updating form: ' + errorText);
                return;
            }

            const result = await response.json();
            onUpdate(result);
        } catch (error) {
            console.error('Error updating form:', error.message);
            alert('Error updating form: ' + error.message);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Form"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2>Edit Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Subcategory</label>
                        <input
                            type="text"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                    />
                </div>
                <div className="form-group">
                    <label>Tags</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Picture URL</label>
                    <input
                        type="text"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Reporter Name</label>
                    <input
                        type="text"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default EditFormModal;
