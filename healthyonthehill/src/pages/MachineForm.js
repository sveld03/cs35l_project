import React, { useState } from 'react';
import './MachineForm.css'

const MachineForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        Cardio_Resistance: '',
        Muscle_Groups: [],
        Body_Free_Machine: '', 
        Uni_Bi: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'Muscle_Groups' ? Array.from(e.target.selectedOptions, option => option.value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="machine-form">
            <label>
                Cardio or Resistance:
                <select name="Cardio_Resistance" value={formData.Cardio_Resistance} onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Resistance">Resistance</option>
                </select>
            </label>

            <label>
                Target Muscle Groups:
                <select name="Muscle_Groups" multiple value={formData.Muscle_Groups} onChange={handleChange}>
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Triceps">Triceps</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Core">Core</option>
                    <option value="Legs">Hamstrings</option>
                    <option value="Quadriceps">Quadriceps</option>
                    <option value="Gluteals">Gluteals</option>
                    <option value="Calves">Calves</option>
                </select>
            </label>
            
            <label>
                Equipment Type:
                <select name="Free_Body_Machine" value={formData.Free_Body_Machine} onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="Body_Weight">Body Weight</option>
                    <option value="Free_Weight">Free Weight</option>
                    <option value="Machine">Machine</option>
                </select>
            </label>

            <label>
                Bilateral or Unilateral:
                <select name="Uni_Bi" value={formData.Uni_Bi} onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="Bilateral">Bilateral</option>
                    <option value="Unilateral">Unilateral</option>
                </select>
            </label>

            <button type="submit">Get Recommendations</button>
        </form>
    );
};

export default MachineForm;
