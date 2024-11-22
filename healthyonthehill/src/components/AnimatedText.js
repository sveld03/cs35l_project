import React, { useState, useEffect, useRef } from 'react';
import TypewriterComponent from 'typewriter-effect';

const AnimatedText = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Find your Favorite&nbsp;</h2>
            <h2 style={{ margin: 0 }}>
            <TypewriterComponent
                options={{
                strings: ['Meal', 'Exercise', 'Bruin Buddy'],
                autoStart: true,
                loop: true,
                }}
            />
            </h2>
        </div>
    );
};

export default AnimatedText;
