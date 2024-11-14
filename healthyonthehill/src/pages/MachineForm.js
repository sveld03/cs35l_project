// EquipmentForm.js
import React, { useState } from 'react';

const EquipmentForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        body_free_machine: '', // body weight, free weight, or machine?
        cardio_resistance: '',
        muscle_groups: [],
        bi_uni: '' // bilateral or unilateral?
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
                Target Muscle Groups:
                <select name="muscle_groups" multiple value={formData.muscle_groups} onChange={handleChange}>
                    <option value="chest">Chest</option>
                    <option value="back">Back</option>
                    <option value="arms">Biceps</option>
                    <option value="arms">Triceps</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="core">Core</option>
                    <option value="legs">Hamstrings</option>
                    <option value="shoulders">Quadriceps</option>
                    <option value="shoulders">Gluteals</option>
                    <option value="shoulders">Calves</option>
                </select>
            </label>

            <label>
                Bilateral or Unilateral:
                <select name="iso_uni" value={formData.bi_uni} onChange={handleChange}>
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
