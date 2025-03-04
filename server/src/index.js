const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load .env variables (remove any duplicate calls)

const app = express();
app.use(express.json());
app.use(cors());

// Verify MONGODB_URI is loaded (for debugging)
console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
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


const TaskSchema = new mongoose.Schema({
    problemTitle: { type: String, required: true },
    problemDescription: { type: String, required: true },
    budget: { type: Number, required: true },
    deadline: { type: Date, required: true },
})

const Task = mongoose.model('Task', TaskSchema);

app.post('/add-task', async (req, res) => {
    console.log('Received task:', req.body);
    const { problemTitle, problemDescription, budget, deadline } = req.body;
    const task = new Task({ problemTitle, problemDescription, budget, deadline });
    await task.save();
    res.status(200).send('Task added successfully');
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks from MongoDB
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving tasks' });
    }
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

module.exports = app;