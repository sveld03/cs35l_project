require('dotenv').config()

import { createTransport } from 'nodemailer';

const sendNotificationEmail = async (userEmail) => {
    const transporter = createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL, // Your email
            pass: process.env.PASSWORD, // Your email password
        },
    });

    const mailOptions = {
        from: 'hillhealthy@gmail.com',
        to: userEmail,
        subject: 'You have a new Gym Buddy!',
        text: "Hi! Based on your profile, we've found another user who we think would make a great gym buddy! Log in to accept the match and connect.",
    };

    await transporter.sendMail(mailOptions);
};
