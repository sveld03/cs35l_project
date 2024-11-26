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
            { location: "FeastAtRieber", stars: 5, comment: null },
            { location: "BruinPlate", stars: 1, comment: null },
            { location: "BruinCafe", stars: 1, comment: null },
            { location: "Rendezvous", stars: 1, comment: null },
            { location: "HedrickStudy", stars: 1, comment: null },
            { location: "Drey", stars: 1, comment: null },
            { location: "EpicAtAckerman", stars: 1, comment: "Perfect spot when between classes" }
        ],
    },
    {
        id: 2,
        name: 'Andrew D',
        email: 'andrew@ucla.edu',
        password: bcrypt.hashSync('password321', 10),
        ratings: [
            { location: "Epicuria", stars: 2, comment: "I found true love at Epicuria" },
            { location: "DeNeve", stars: 1, comment: null },
            { location: "FeastAtRieber", stars: 5, comment: "Dog water" },
            { location: "BruinPlate", stars: 4, comment: "Too Healthy yuck" },
            { location: "BruinCafe", stars: 1, comment: null },
            { location: "Rendezvous", stars: 1, comment: null },
            { location: "HedrickStudy", stars: 1, comment: null },
            { location: "Drey", stars: 1, comment: null },
            { location: "EpicAtAckerman", stars: 1, comment: null }
        ],
    },
    {
        id: 3,
        name: 'Steven V',
        email: 'andrew@ucla.edu',
        password: bcrypt.hashSync('password321', 10),
        ratings: [
            { location: "Epicuria", stars: 2, comment: "Yummy" },
            { location: "DeNeve", stars: 1, comment: null },
            { location: "FeastAtRieber", stars: 5, comment: null },
            { location: "BruinPlate", stars: 4, comment: null },
            { location: "BruinCafe", stars: 1, comment: null },
            { location: "Rendezvous", stars: 1, comment: null },
            { location: "HedrickStudy", stars: 1, comment: null },
            { location: "Drey", stars: 1, comment: null },
            { location: "EpicAtAckerman", stars: 1, comment: null }
        ],
    },
    {
        id: 3,
        name: 'Ananya A',
        email: 'ananya04@ucla.edu',
        password: bcrypt.hashSync('password321', 10),
        ratings: [
            { location: "Epicuria", stars: 5, comment: "Yummy" },
            { location: "DeNeve", stars: 1, comment: "Yucky" },
            { location: "FeastAtRieber", stars: 5, comment: "My fav" },
            { location: "BruinPlate", stars: 3, comment: "cardboard" },
            { location: "BruinCafe", stars: 2, comment: "eww" },
            { location: "Rendezvous", stars: 5, comment: "my go to <3" },
            { location: "HedrickStudy", stars: 5, comment: "I loveee their choco mousse" },
            { location: "Drey", stars: 1, comment: "eww" },
            { location: "EpicAtAckerman", stars: 1, comment: null }
        ],
    }
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
        { location: "FeastAtRieber", stars: null, comment: null },
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

