const getUserRatingForDiningHall = (req, res) => {
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



module.exports = {getUserRatingForDiningHall, updateRatingForDiningHall, getRatingForDiningHall, getCommentsForDiningHall };