// EquipmentForm.js
import React, { useState } from 'react';

const EquipmentForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        body_free_machine: '',
        cardio_resistance: '',
        location: '',
        quantity: '',
        muscle_groups: [],
        iso_uni: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'muscle_groups' ? Array.from(e.target.selectedOptions, option => option.value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>

            <label>
                Equipment Type:
                <select name="body_free_machine" value={formData.body_free_machine} onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="body_weight">Body Weight</option>
                    <option value="free_weight">Free Weight</option>
                    <option value="machine">Machine</option>
                </select>
            </label>

            <label>
                Cardio or Resistance:
                <select name="cardio_resistance" value={formData.cardio_resistance} onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="cardio">Cardio</option>
                    <option value="resistance">Resistance</option>
                </select>
            </label>

            <label>
                Location:
                <input type="text" name="location" placeholder="Any" value={formData.location} onChange={handleChange} />
            </label>

            <label>
                Quantity:
                <input type="text" name="quantity" placeholder="Any" value={formData.quantity} onChange={handleChange} />
            </label>

            <label>
                Target Muscle Groups:
                <select name="muscle_groups" multiple value={formData.muscle_groups} onChange={handleChange}>
                    <option value="chest">Chest</option>
                    <option value="back">Back</option>
                    <option value="arms">Arms</option>
                    <option value="legs">Legs</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="core">Core</option>
                </select>
            </label>

            <label>
                Isolateral or Unilateral:
                <select name="iso_uni" value={formData.iso_uni} onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="isolateral">Isolateral</option>
                    <option value="unilateral">Unilateral</option>
                </select>
            </label>

            <button type="submit">Get Recommendations</button>
        </form>
    );
};

export default EquipmentForm;
