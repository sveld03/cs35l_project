import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';

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
        <Typography variant="h5" gutterBottom >
            Find your favorite  <span style={{ color: 'red' }}>{currWord}</span>
        </Typography>

    );
};

export default AnimatedText;