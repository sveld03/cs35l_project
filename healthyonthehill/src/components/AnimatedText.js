import React, { useState, useEffect, useRef } from 'react';
import TypewriterComponent from 'typewriter-effect';
const wordList = ['Meal', 'Exercise', 'Bruin Buddy', 'Meal'];

const AnimatedText = () => {
    const [currWord, setCurrWord] = useState(wordList[0]);

    const index = useRef(0);
    useEffect(() => {
        let interval = null;
        if (true) {
            interval = setInterval(() => {
                index.current++;
                setCurrWord(wordList[index.current]);
                if (index.current === wordList.length - 1) {
                    index.current = 0;
                }
            }, 1200);
        }
        return () => clearInterval(interval);
    });

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
