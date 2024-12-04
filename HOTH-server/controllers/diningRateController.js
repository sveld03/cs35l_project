const user = require("../model/user");
const User = require("../model/user");

const getUserRatingForDiningHall = async (req, res) => {
  const { dininghall } = req.params;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "Cannot find user" });
    }
    if (!dininghall) {
      return res
        .status(400)
        .json({ error: "Dining hall is a required parameter" });
    }
    if (!user.ratings) {
      return res.status(400).json({ error: "This user has no ratings" });
    }

    const ratings = user.ratings[dininghall]; 
    if (!ratings || ratings.stars === null) {
      return res.status(404).json({
        error: "Ratings for the specified dining hall by the user not found",
      });
    }
    return res.status(200).json({
      location: dininghall,
      stars: ratings.stars,
      comment: ratings.comment,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

const updateRatingForDiningHall = async (req, res) => {
  const { dininghall } = req.params;
  const { stars, comment } = req.body;
  console.log(dininghall);
  try {
    if (!dininghall || stars === undefined) {
      return res
        .status(400)
        .json({ error: "Dining hall and stars are required" });
    }
    if (stars < 1 || stars > 5) {
      return res
        .status(400)
        .json({ error: "Stars must be a value between 1 and 5" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "Cannot find user" });
    }

    if (!user.ratings) {
      user.ratings = {};
    }

    if (!user.ratings[dininghall]) {
      return res
        .status(404)
        .json({ error: `Dining hall ${dininghall} not found` });
    }

    user.ratings[dininghall].stars = stars;
    user.ratings[dininghall].comment = comment || null;

    await user.save();

    return res
      .status(200)
      .json({ message: `Rating for ${dininghall} updated successfully` });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

const getRatingForDiningHall = async (req, res) => {
    const { dininghall } = req.params;
  
    if (!dininghall) {
      return res.status(400).json({ error: "Dining hall is required" });
    }
  
    try {
        console.log('in the try')
      // Retrieve all users with ratings for the specified dining hall
      const users = await User.find({ [`ratings.${dininghall}`]: { $exists: true } }, `ratings.${dininghall}`);
  
      if (!users || users.length === 0) {
        return res.status(404).json({ error: `No ratings found for ${dininghall}` });
      }
      console.log('got all users')
  
      // Calculate total stars and count
      let totalStars = 0;
      let count = 0;
      console.log('here')
      users.forEach(user => {
        const rating = user.ratings[dininghall];
        if (rating.stars != null) {
          totalStars += rating.stars;
          count++;
        }
      });
      console.log('now here')
      
      if (count === 0) {
        return res.status(404).json({ error: `No ratings found for ${dininghall}` });
      }
  
      const averageStars = (totalStars / count).toFixed(2);
  
      return res.status(200).json({ location: dininghall, rating: averageStars });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error", details: err.message });
    }
  };
  

const getCommentsForDiningHall = async (req, res) => {
  const { dininghall } = req.params;
  console.log("in the rating contorller");

  try {
    if (!dininghall) {
      return res.status(400).json({ error: "Dining hall is required" });
    }

    const users = await User.find({ [`ratings.${dininghall}`]: { $exists: true } }, `ratings.${dininghall}`);
    if (!users.length) {
      return res.status(404).json({ error: "No users found" });
    }

    const comments = [];
    for (const user of users) {
      const rating = user.ratings[dininghall];
      if (rating && rating.comment) {
        comments.push({ user: user.name, comment: rating.comment });
      }
    }

    if (comments.length === 0) {
      return res
        .status(404)
        .json({ error: "No comments found for the specified dining hall" });
    }

    return res.status(200).json({
      location: dininghall,
      comments,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

module.exports = {
  getUserRatingForDiningHall,
  updateRatingForDiningHall,
  getRatingForDiningHall,
  getCommentsForDiningHall,
};
