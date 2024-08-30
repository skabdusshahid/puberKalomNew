import React from 'react';
import Modal from 'react-modal';
import './ViewFormModal.style.css';
import Http from '../Http';

const ViewFormModal = ({ isOpen, onRequestClose, form }) => {
  // Convert date to a readable format if available
  const formattedDate = form.date ? new Date(form.date).toLocaleString() : 'No date provided';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>View News</h2>
      <div className="form-details">
        <h4>{form.title}</h4>
        {form.picture && (
          <div style={{ textAlign: "center" }}>
            <img src={`${Http}${form.picture}`} alt="Uploaded" />
          </div>
        )}

        <div>{form.reporterName} , {form.location } <div dangerouslySetInnerHTML={{ __html: form.content }} /></div>
        
        
        
        <p><strong>Tags:</strong> {form.tags.join(', ')}</p>
        <p><strong>Category:</strong> {form.category}</p>
        <p><strong>Subcategory:</strong> {form.subcategory}</p>
        <p><strong>Reporter Name:</strong> {form.reporterName || 'No reporter name provided'}</p>
        <p><strong>Location:</strong> {form.location || 'No location provided'}</p>
        <p><strong>Date:</strong> {formattedDate}</p>
      </div>
      <button onClick={onRequestClose} className="close-button">Close</button>
    </Modal>
  );
};

export default ViewFormModal;
