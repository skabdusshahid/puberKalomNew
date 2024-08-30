import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import { WithContext as ReactTags } from 'react-tag-input';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import './AdminDashboard.css';
import AdminLayout from '../../Layout/AdminLayout';
import AuthContext from './AuthContext';
import axios from 'axios';
import Http from '../../Http';

const AdminDashboard = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(null);
    const [content, setContent] = useState('');
    const [picture, setPicture] = useState(null);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isBreaking, setIsBreaking] = useState(false);
    const [picturePreview, setPicturePreview] = useState(null);
    const [reporterName, setReporterName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date().toISOString());
    const [metaTitle, setMetaTitle] = useState(''); // New state for Meta Title
    const [metaDescription, setMetaDescription] = useState(''); // New state for Meta Description

    const navigate = useNavigate();
    const { reporterId } = useContext(AuthContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (reporterId) {
            axios.get(`${Http}/reporters/${reporterId}`)
                .then(response => setReporterName(response.data.name))
                .catch(error => console.error('Error fetching reporter:', error));
        }
    }, [reporterId]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${Http}/categories`);
            const data = await response.json();
            const formattedCategories = data.map(cat => ({ value: cat._id, label: cat.name }));
            setCategories(formattedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    useEffect(() => {
        if (picture) {
            const objectUrl = URL.createObjectURL(picture);
            setPicturePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [picture]);

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category.label);
        formData.append('content', content);
        if (picture) formData.append('picture', picture);
        formData.append('tags', JSON.stringify(tags.map(tag => tag.text)));
        formData.append('isBreaking', isBreaking);
        formData.append('reporterName', reporterName);
        formData.append('location', location);
        formData.append('date', date);
        formData.append('metaTitle', metaTitle); // Append Meta Title
        formData.append('metaDescription', metaDescription); // Append Meta Description

        try {
            const response = await fetch(`${Http}/admindashboard-new`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                alert('Error submitting form: ' + errorText);
                return;
            }

            const result = await response.json();
            alert(result.message);
            navigate('/adminDashboardView');
        } catch (error) {
            console.error('Error submitting form:', error.message);
            alert('Error submitting form: ' + error.message);
        }
    };

    return (
        <AdminLayout>
            <div className="admin-dashboard">
                <h1>Admin Dashboard</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Meta Title:</label> {/* New Meta Title field */}
                        <input
                            type="text"
                            value={metaTitle}
                            onChange={e => setMetaTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Meta Description:</label> {/* New Meta Description field */}
                        <textarea
                            value={metaDescription}
                            onChange={e => setMetaDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <Select
                            value={category}
                            onChange={setCategory}
                            options={categories}
                        />
                    </div>
                    <div className="form-group">
                        <label>Reporter Name:</label>
                        <input
                            type="text"
                            value={reporterName}
                            onChange={e => setReporterName(e.target.value)}
                            readOnly
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                        />
                    </div>
                    <div className="form-group-container">
                        <div className="form-group">
                            <label>Picture:</label>
                            <div className="file-upload-container">
                                <input
                                    type="file"
                                    onChange={e => setPicture(e.target.files[0])}
                                />
                                {picturePreview && (
                                    <img
                                        src={picturePreview}
                                        alt="Preview"
                                        className="image-preview"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Tags:</label>
                        <ReactTags
                            tags={tags}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            inputFieldPosition="inline"
                            autocomplete
                            autoFocus={false}
                            classNames={{
                                tags: 'react-tags',
                                selected: 'react-tags__selected',
                                tag: 'react-tags__selected-tag',
                                remove: 'react-tags__selected-tag button',
                                input: 'react-tags__input',
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ display: "inline-flex" }}>
                        <label style={{ paddingRight: "30px" }}>Is Breaking:</label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isBreaking}
                                onChange={e => setIsBreaking(e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
