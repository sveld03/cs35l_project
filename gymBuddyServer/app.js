const mongoose = require('./db'); 
const User = require('./buddyModel/user.js'); 

// Example user data ( will add more later)

const newUser = new User({
  // basic info
  name: 'John Doe',
  age: 25,
  gender: 'Male',

  // contact info
  email: 'johndoe@example.com',
  phoneNumber: '123-456-7890',
  Insta: 'john_doe_insta',
  preferredContactMethod: 'Phone',

  // fitness info
  fitnessLevel: 'Intermediate',
  goal: ['Muscle Gain', 'Cardiovascular Endurance'],
  availability: [
    { day: 'Monday', times: ['Morning', 'Evening'] },
    { day: 'Wednesday', times: ['Afternoon'] },
    { day: 'Friday', times: ['Evening'] }
  ],
  gymPreference: ['BFit'],
  motivationStyle: 'Supportive',

  // buddy preferences
  BuddyPreferences: {
    preferredGender: 'Female',
    preferredFitnessLevel: 'Intermediate',
    motivationStyle: 'Supportive'
  },

  // extra profile info
  bio: 'Looking for a gym buddy to stay motivated and push myself harder!',
  profilePicture: 'http://example.com/profile.jpg'
});

// Save the new user to the database
newUser.save((err) => {
  if (err) {
    console.error('Error creating user:', err.message);
  } else {
    console.log('User created successfully!');
  }
});
