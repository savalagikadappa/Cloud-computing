const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
});

const User = mongoose.model('User', UserSchema);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    // console.log("hello i am here to handle everything")
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = new User({ email, password: hashedPassword, otp, otpExpires });
    await user.save();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP for Signup',
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("failed to send mail")
            console.log(error)
            return res.status(500).send('Failed to send OTP');
        }
        res.status(200).send('OTP sent successfully');
    });
});

app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send('User not found');
    }

    if (user.otp !== otp) {
        return res.status(400).send('Invalid OTP');
    }

    if (user.otpExpires < new Date()) {
        return res.status(400).send('OTP has expired');
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).send('OTP verified successfully');
});

app.post('/resend-otp', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send('User not found');
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'New OTP for Signup',
        text: `Your new OTP is ${otp}. It will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send OTP');
        }
        res.status(200).send('New OTP sent successfully');
    });
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email + " " + password)
    const user = await User.findOne({ email });
    const all = await User.find({})
    console.log(all)
    console.log("entered credentials are " + email + " " + password)

    if (!user) {
        return res.status(401).send('Invalid email or password');
    }
    console.log(user.password)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send('Invalid email or password');
    }

    if (!user.isVerified) {
        return res.status(401).send('Please verify your email first');
    }

    res.status(200).send('Login successful');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});