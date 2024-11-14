import React from 'react';

const MachineFilter = ({ preferences, machines }) => {
    const filteredMachines = machines.filter(machine => {
        return (
            (!preferences.body_free_machine || machine.type === preferences.body_free_machine) &&
            (!preferences.cardio_resistance || machine.category === preferences.cardio_resistance) &&
            (!preferences.location || machine.location === preferences.location) &&
            (!preferences.quantity || machine.quantity === preferences.quantity) &&
            (preferences.muscle_groups.length === 0 || preferences.muscle_groups.some(muscle => machine.targetMuscles.includes(muscle))) &&
            (!preferences.iso_uni || machine.movementType === preferences.iso_uni)
        );
    });

    return (
        <div>
            <h2>Recommended Machines</h2>
            {filteredMachines.length > 0 ? (
                <ul>
                    {filteredMachines.map((machine, index) => (
                        <li key={index}>
                            <h3>{machine.name}</h3>
                            <p>Type: {machine.type}</p>
                            <p>Category: {machine.category}</p>
                            <p>Location: {machine.location}</p>
                            <p>Quantity: {machine.quantity}</p>
                            <p>Targets: {machine.targetMuscles.join(', ')}</p>
                            <p>Movement: {machine.movementType}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations found for your selection.</p>
            )}
        </div>
    );
};

export default MachineFilter;
