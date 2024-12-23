import React, { useState } from 'react';
import axios from 'axios';

function NewAmmunition() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState([{ title: '', description: '' }]);

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { title: '', description: '' }]);
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][field] = value;
    setSpecifications(updatedSpecifications);
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecifications);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tool-backendf.onrender.com/api/items', {
        title,
        description,
        specifications,
      });
      console.log('Item added:', response.data);
      setTitle('');
      setDescription('');
      setSpecifications([{ title: '', description: '' }]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Technical Specifications</label>
        {specifications.map((spec, index) => (
          <div key={index} className="row mb-2 align-items-center">
           <div className="col-md-5">
           <input
              type="text"
              className="form-control mb-2"
              placeholder="Specification Title"
              value={spec.title}
              onChange={(e) => handleSpecificationChange(index, 'title', e.target.value)}
              required
            />
           </div>
            <div className="col-md-6">
            <input
              className="form-control mb-2"
              rows="2"
              placeholder="Specification Description"
              value={spec.description}
              onChange={(e) => handleSpecificationChange(index, 'description', e.target.value)}
              required
            ></input>
            </div>
            <div className="col-1">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleRemoveSpecification(index)}
            >
              Remove
            </button>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={handleAddSpecification}>
          Add More
        </button>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default NewAmmunition;
