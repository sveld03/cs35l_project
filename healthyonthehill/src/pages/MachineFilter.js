import React from 'react';

const MachineFilter = ({ preferences }) => {
    const machines = require('../data/gym_database.machines.json')
    const filteredMachines = machines.filter(machine => {
        return (
            (!preferences.Free_Body_Machine || machine.Free_Body_Machine === preferences.Free_Body_Machine) &&
            (!preferences.Cardio_Resistance || machine.Cardio_Resistance === preferences.Cardio_Resistance) &&
            (preferences.Muscle_Groups.length === 0 || preferences.Muscle_Groups.some(muscle => machine.Muscle_Groups.includes(muscle))) &&
            (!preferences.Uni_Bi || machine.Uni_Bi === preferences.Uni_Bi)
        );
    });

    return (
        <div>
            <h2>Recommended Equipment</h2>
            {filteredMachines.length > 0 ? (
                <ul>
                    {filteredMachines.map((machine, index) => (
                        <li key={index}>
                            <h3>{machine.Equipment_Name}</h3>
                            <p>Type: {machine.Free_Body_Machine}</p>
                            <p>Category: {machine.Cardio_Resistance}</p>
                            <p>Location: {machine.Location}</p>
                            <p>Quantity: {machine.Quantity}</p>
                            <p>Muscle Groups: {machine.Muscle_Groups}</p>
                            <p>Movement: {machine.Uni_Bi}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    <p>No recommendations found for your selection.</p>
                </ul>
            )}
        </div>
    );
};

export default MachineFilter;
