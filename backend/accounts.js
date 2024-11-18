const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'DhTURFcrFl3cB9x3KZGzdYJKxBJAZeScOyM5lkHauVw=';

// Replace with database later
const users = [
    {
        id: 1,
        name: 'Gabe S',
        email: 'gabe@ucla.edu',
        password: bcrypt.hashSync('password123', 10),
        ratings: [
            { location: "Epicuria", stars: 5, comment: "I LOVE EPIC!!" },
            { location: "DeNeve", stars: 1, comment: "I HATE DENEVE" },
            { location: "FeastAtReiber", stars: null, comment: null },
            { location: "BruinPlate", stars: null, comment: null },
            { location: "BruinCafe", stars: null, comment: null },
            { location: "Rendezvous", stars: null, comment: null },
            { location: "HedrickStudy", stars: null, comment: null },
            { location: "Drey", stars: null, comment: null },
            { location: "EpicAtAckerman", stars: null, comment: null }
        ],
    },
    {
        id: 2,
        name: 'Andrew D',
        email: 'andrew@ucla.edu',
        password: bcrypt.hashSync('password321', 10),
        ratings: [
            { location: "Epicuria", stars: null, comment: null },
            { location: "DeNeve", stars: null, comment: null },
            { location: "FeastAtReiber", stars: null, comment: null },
            { location: "BruinPlate", stars: null, comment: null },
            { location: "BruinCafe", stars: null, comment: null },
            { location: "Rendezvous", stars: null, comment: null },
            { location: "HedrickStudy", stars: null, comment: null },
            { location: "Drey", stars: null, comment: null },
            { location: "EpicAtAckerman", stars: null, comment: null }
        ],
    },
];

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!email.endsWith('@ucla.edu')) {
        return res.status(400).json({ error: 'Only @ucla.edu emails are allowed' });
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

const createAccount = (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (!email.endsWith('@ucla.edu')) {
        return res.status(400).json({ error: 'Only @ucla.edu emails are allowed' });
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const nullRatings = [
        { location: "Epicuria", stars: null, comment: null },
        { location: "DeNeve", stars: null, comment: null },
        { location: "FeastAtReiber", stars: null, comment: null },
        { location: "BruinPlate", stars: null, comment: null },
        { location: "BruinCafe", stars: null, comment: null },
        { location: "Rendezvous", stars: null, comment: null },
        { location: "HedrickStudy", stars: null, comment: null },
        { location: "Drey", stars: null, comment: null },
        { location: "EpicAtAckerman", stars: null, comment: null }
    ];

    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        name,
        ratings: nullRatings,
    };

    users.push(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
        message: 'Account created successfully',
        token,
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
};

const getAccount = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const user = users.find((user) => user.id === decoded.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({
        name: user.name,
        email: user.email,
    });
};

const updateAccount = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const { name, password } = req.body;
    const user = users.find((user) => user.id === decoded.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (name) {
        user.name = name;
    }

    if (password) {
        user.password = bcrypt.hashSync(password, 10);
    }

    res.json({ message: 'Account updated successfully', user });
};

const getUserRatingForDiningHall = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const { dininghall } = req.params;

    if (!dininghall) {
        return res.status(400).json({ error: 'Dining hall is required' });
    }

    const user = users.find((user) => user.id === decoded.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const rating = user.ratings.find((rating) => rating.location.toLowerCase() === dininghall.toLowerCase());

    if (!rating) {
        return res.status(404).json({ error: 'Rating for the specified dining hall not found' });
    }

    res.json({
        location: rating.location,
        stars: rating.stars,
        comment: rating.comment,
    });
};

const updateRatingForDiningHall = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const { dininghall } = req.params;
    const { stars, comment } = req.body;

    if (!dininghall || stars === undefined) {
        return res.status(400).json({ error: 'Dining hall and stars are required' });
    }

    if (stars < 1 || stars > 5) {
        return res.status(400).json({ error: 'Stars must be a value between 1 and 5' });
    }

    const user = users.find((user) => user.id === decoded.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const rating = user.ratings.find((rating) => rating.location.toLowerCase() === dininghall.toLowerCase());

    if (!rating) {
        return res.status(404).json({ error: 'Rating for the specified dining hall not found' });
    }

    rating.stars = stars;
    if (comment) {
        rating.comment = comment;
    }

    res.json({
        message: 'Rating updated successfully',
        rating,
    });
};

module.exports = { login, createAccount, getAccount, updateAccount, getUserRatingForDiningHall, updateRatingForDiningHall };
