import { useState } from "react";
import Modal from "react-modal";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from "prop-types"; // Import PropTypes from 'prop-types'
import "./AddCategoryModal.style.css"; 
import Http from "../Http";

// Import the CSS file for styling

//import {Editor} from "novel";
// Ensure the app element is set for accessibility reasons
Modal.setAppElement("#root"); // Replace '#root' with the ID of your root element

const AddPageModal = ({ isOpen, onRequestClose }) => {
  // Add prop validation
  AddPageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  };
  const [pageName, setpageName] = useState("");
  const [description, setDescription] = useState(""); // Add this line to define the 'description' state variable

  const module = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
  
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ indent: '-1'}, { indent: '+1' }],
  
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
  
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pageData = { name: pageName , description };

    try {
      const response = await fetch(`${Http}/pages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        alert("Error submitting page: " + errorText);
        return;
      }

      const result = await response.json();
      alert(result.message);
      setpageName("");
      onRequestClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting page:", error.message);
      alert("Error submitting page: " + error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Page Modal"
      className="add-category-modal"
      overlayClassName="add-category-overlay"
    >
      <div className="add-category-modal-content">
        <h2>Add New page</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Page Name:</label>
            <input
              type="text"
              value={pageName}
              onChange={(e) => setpageName(e.target.value)}
              placeholder="Enter page name"
            />
          </div>

          {/* <div className="form-group">
            <label>Description:</label>
            <textarea
              className="addPagesDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div> */}
          <div className="form-group">
                        <label>Content:</label>
                        <ReactQuill
                            modules={module}
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
              <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onRequestClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPageModal;
