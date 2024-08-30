import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';
import './MenuList.css';
import Http from '../../Http';

const MenuList = () => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [newData, setNewData] = useState('');
  const [newItem, setNewItem] = useState('');

  // Fetch data from the server on component mount
  useEffect(() => {
    axios.get(`${Http}/menubar`)
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewData(data[index].itemName);
  };

  const handleDelete = (index) => {
    axios.delete(`${Http}/menubar/${data[index]._id}`)
      .then(() => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const handleSave = () => {
    const updatedItem = { itemName: newData };
    axios.put(`${Http}/menubar/${data[editIndex]._id}`, updatedItem)
      .then(() => {
        const updatedData = [...data];
        updatedData[editIndex] = { ...updatedData[editIndex], ...updatedItem };
        setData(updatedData);
        setEditIndex(null);
        setNewData('');
      })
      .catch(error => console.error('Error updating item:', error));
  };

  const handleAdd = () => {
    if (newItem.trim() !== '') {
      axios.post(`${Http}/menubar`, { itemName: newItem })
        .then(response => {
          setData([...data, response.data]);
          setNewItem('');
        })
        .catch(error => console.error('Error adding item:', error));
    }
  };

  const moveItemUp = (index) => {
    if (index === 0) return;
    const updatedData = [...data];
    const temp = updatedData[index - 1];
    updatedData[index - 1] = updatedData[index];
    updatedData[index] = temp;
    setData(updatedData);
  };

  const moveItemDown = (index) => {
    if (index === data.length - 1) return;
    const updatedData = [...data];
    const temp = updatedData[index + 1];
    updatedData[index + 1] = updatedData[index];
    updatedData[index] = temp;
    setData(updatedData);
  };

  return (
    <div className="menu-list-container">
      <h3 className="menu-list-title">Data List</h3>

      <div className="menu-list-add">
        <input 
          type="text" 
          placeholder="Add new item" 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)} 
          className="menu-list-input"
        />
        <button onClick={handleAdd} className="menu-list-add-button">
          <FaPlus /> Add
        </button>
      </div>

      <ul className="menu-list">
        {data.map((item, index) => (
          <li key={item._id} className="menu-list-item">
            {editIndex === index ? (
              <>
                <input 
                  type="text" 
                  value={newData} 
                  onChange={(e) => setNewData(e.target.value)} 
                  className="menu-list-input"
                />
                <button onClick={handleSave} className="menu-list-save-button">
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="menu-list-text">{item.itemName}</span>
                <div className="menu-list-actions">
                  <button onClick={() => handleEdit(index)} className="menu-list-button">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(index)} className="menu-list-button">
                    <FaTrash />
                  </button>
                  <button onClick={() => moveItemUp(index)} className="menu-list-button">
                    <FaArrowUp />
                  </button>
                  <button onClick={() => moveItemDown(index)} className="menu-list-button">
                    <FaArrowDown />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
