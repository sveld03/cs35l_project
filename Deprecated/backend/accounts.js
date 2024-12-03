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
            { location: "Cafe1919", stars: 3, comment: null },
            { location: "Rendezvous", stars: 1, comment: null },
            { location: "HedrickStudy", stars: 1, comment: null },
            { location: "Drey", stars: 1, comment: null },
            { location: "EpicAtAckerman", stars: 1, comment: "Perfect spot when between classes" },
            { location: "DeNeveLateNight", stars: null, comment: null }
        ],
        fitnessInfo: {
            gender: 'Male',
            fitnessLevel: 'Intermediate',
            fitnessGoal: 'Flexibility',
            gymPreference: 'Bfit',
            motivationStyle: 'Supportive',
            availability: Array(3).fill().map(() => Array(7).fill(true)),
        },
        buddyPreferences: {
            buddyGender: 'Male',
            buddyFitnessLevel: 'Intermediate',
            buddyMotivationStyle: 'Competitive',
        }
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
            { location: "Cafe1919", stars: 3, comment: null },
            { location: "Rendezvous", stars: 1, comment: null },
            { location: "HedrickStudy", stars: 1, comment: null },
            { location: "Drey", stars: 1, comment: null },
            { location: "EpicAtAckerman", stars: 1, comment: null },
            { location: "DeNeveLateNight", stars: 2, comment: "Interesting" }
        ],
        fitnessInfo: {
            gender: 'Male',
            fitnessLevel: 'Advanced',
            fitnessGoal: 'Cardiovascular Endurance',
            gymPreference: 'Wooden',
            motivationStyle: 'Flexible',
            availability: Array(3).fill().map(() => Array(7).fill(true)),
        },
        buddyPreferences: {
            buddyGender: 'Female',
            buddyFitnessLevel: 'Advanced',
            buddyMotivationStyle: 'Competitive',
        }
    },
    {
        id: 3,
        name: 'Steven V',
        email: 'steven@ucla.edu',
        password: bcrypt.hashSync('password456', 10),
        ratings: [
            { location: "Epicuria", stars: 2, comment: "Yummy" },
            { location: "DeNeve", stars: 1, comment: null },
            { location: "FeastAtRieber", stars: 5, comment: null },
            { location: "BruinPlate", stars: 4, comment: null },
            { location: "BruinCafe", stars: 1, comment: null },
            { location: "Cafe1919", stars: 3, comment: null },
            { location: "Rendezvous", stars: 1, comment: null },
            { location: "HedrickStudy", stars: 1, comment: null },
            { location: "Drey", stars: 1, comment: null },
            { location: "EpicAtAckerman", stars: 1, comment: null },
            { location: "DeNeveLateNight", stars: 2, comment: null }
        ],
        fitnessInfo: {
            gender: 'Male',
            fitnessLevel: 'Intermediate',
            fitnessGoal: 'Flexibility',
            gymPreference: 'Bfit',
            motivationStyle: 'Competitive',
            availability: Array(3).fill().map(() => Array(7).fill(true)),
        },
        buddyPreferences: {
            buddyGender: 'Male',
            buddyFitnessLevel: 'Intermediate',
            buddyMotivationStyle: 'Supportive',
        }
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

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
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
        { location: "Cafe1919", stars: 3, comment: null },
        { location: "Rendezvous", stars: null, comment: null },
        { location: "HedrickStudy", stars: null, comment: null },
        { location: "Drey", stars: null, comment: null },
        { location: "EpicAtAckerman", stars: null, comment: null },
        { location: "DeNeveLateNight", stars: null, comment: null }
    ];

    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        name,
        ratings: nullRatings,
    };

    users.push(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET);

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

const getRatingForDiningHall = (req, res) => {
    const { dininghall } = req.params;

    if (!dininghall) {
        return res.status(400).json({ error: 'Dining hall is required' });
    }

    let totalStars = 0;
    let count = 0;

    users.forEach(user => {
        const rating = user.ratings.find(rating => rating.location.toLowerCase() === dininghall.toLowerCase());
        if (rating && rating.stars !== null) {
            totalStars += rating.stars;
            count += 1;
        }
    });

    if (count === 0) {
        return res.status(404).json({ error: 'No ratings found for the specified dining hall' });
    }

    const averageStars = (totalStars / count).toFixed(2);

    res.json({
        location: dininghall,
        averageStars,
    });
};

const getCommentsForDiningHall = (req, res) => {
    const { dininghall } = req.params;

    if (!dininghall) {
        return res.status(400).json({ error: 'Dining hall is required' });
    }

    const comments = [];

    users.forEach(user => {
        const rating = user.ratings.find(rating => rating.location.toLowerCase() === dininghall.toLowerCase());
        if (rating && rating.comment) {
            comments.push({ user: user.name, comment: rating.comment });
        }
    });

    if (comments.length === 0) {
        return res.status(404).json({ error: 'No comments found for the specified dining hall' });
    }

    res.json({
        location: dininghall,
        comments,
    });
};

const updateBuddyPreferences = (req, res) => {

    console.log('Request received at /updateBuddyPreferences');
    console.log('Body:', req.body);

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

    const { fitnessInfo, buddyPreferences } = req.body;

    if (!fitnessInfo || !buddyPreferences) {
        return res.status(400).json({ error: 'Fitness info and buddy preferences are required' });
    }

    const user = users.find((user) => user.id === decoded.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.fitnessInfo = fitnessInfo;
    user.buddyPreferences = buddyPreferences;

    res.json({ message: 'Preferences updated successfully', user });
}


const findBuddy = (req, res) => {
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

    const matches = users.filter((buddy) => {
        if (buddy.id === user.id) return false; // Exclude the user themselves

        // Match based on preferences
        const matchGender = user.buddyPreferences.buddyGender === '' || user.buddyPreferences.buddyGender === buddy.gender;
        const matchFitnessLevel = user.buddyPreferences.buddyFitnessLevel === '' || user.buddyPreferences.buddyFitnessLevel === buddy.fitnessInfo.fitnessLevel;
        const matchMotivationStyle = user.buddyPreferences.buddyMotivationStyle === '' || user.buddyPreferences.buddyMotivationStyle === buddy.fitnessInfo.motivationStyle;

        return matchGender && matchFitnessLevel && matchMotivationStyle;
    });

    if (matches.length === 0) {
        return res.status(404).json({ error: 'No matches found' });
    }

    res.json({ matches });
};

module.exports = { login, createAccount, getAccount, updateAccount, getUserRatingForDiningHall, updateRatingForDiningHall, getRatingForDiningHall, getCommentsForDiningHall, updateBuddyPreferences, findBuddy };
