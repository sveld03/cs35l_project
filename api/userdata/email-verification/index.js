/*

curl -X POST http://localhost:8080/register \
-H "Content-Type: application/json" \
-d '{
  "email": "aandrewduong@protonmail.com",
  "name": "Andrew Duong",
  "password": "adadadada"
}'

curl -X GET http://localhost:8080/user \
-H "Content-Type: application/json" \
-d '{
  "email": "aandrewduong@protonmail.com"
}'


*/

const nodemailer = require("nodemailer");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const dbLocal = require("db-local");
const app = express();
const { Schema } = new dbLocal({ path: "./databases" });

app.use(bodyParser.json());

const User = Schema("User", {
  email: { type: String, required: true },
  password: { type: String, required: true },
    name: { type: String, required: true },
    isVerified: {type: String, default: false},
    verificationToken: {type: Boolean, default: null},
    verificationTokenExpires: {type: Date, default: null},
  ratings: { 
    type: Array, 
    default: [
      { location: "Epicuria", stars: null, comment: null },
      { location: "DeNeve", stars: null, comment: null },
      { location: "FeastAtReiber", stars: null, comment: null },
      { location: "BruinPlate", stars: null, comment: null },
      { location: "BruinCafe", stars: null, comment: null },
      { location: "Rendezvous", stars: null, comment: null },
      { location: "HedrickStudy", stars: null, comment: null },
      { location: "Drey", stars: null, comment: null },
      { location: "EpicAtAckerman", stars: null, comment: null }
    ]
  },
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
	user: provess.env.EMAIL_USERNAME, //uses ucla email from .env file
	pass: process.env.EMAIL_PASSWORD //uses password from .env file
    }
});

async function sendVerificationEmail(email,token){
    //verify ucla email
    if(!email.endsWith('@g.ucla.edu')){
	throw new Error('Please use your UCLA email address (@g.ucla.edu)');
    }
    
    const verificationUrl = 'http://localhost:8080/verify-email?token=${token}';

    const mailOptions = {
	from: process.env.EMAIL_USERNAME,
	to: email,
	subject: 'Verify your Healthy on the Hill UCLA Account',
	html: `
         <h1>Welcome to Healthy on the Hill!</h1>
         <p>Hi Bruin! Please verify your UCLA email address by clicking the link below:</p>
         <a href="${verificationUrl}">${verificationUrl}</a>
         <p>This link will expire in 24 hours.</p>
         <p>Fight On!</p>
         <br>
         <p>Note: This service is exclusively for UCLA students.</p>
       `
};

try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to UCLA address');
} catch(error){
    console.error('Error sending verification email:', error);
    throw error;
}
}

app.post("/register", (req, res) => {
    const { email, name, password } = req.body;
  
    const existingUser = User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  
    const newUser = User.create({
      email,
      name,
      password,
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
      ]
    });
  
    newUser.save();
  
    const savedUser = User.findOne({ email });
    if (savedUser) {
      res.status(201).json({ 
        message: "User registered successfully", 
      });
    } else {
      res.status(500).json({ message: "Error creating user" });
    }
  });

app.get("/user", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email query parameter is required" });
  }

  const user = User.findOne({ email });
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(8080, () => console.log("Listening at port 8080"));
