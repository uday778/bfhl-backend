const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3001'], // Adjust as needed
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// User info
const user = {
    user_id: "21BCE2959",
    email: "somaudaykiran2021@vitstudent.ac.in",
    roll_number: "21BCE2959"
};

// Function to classify data
function classifyData(data) {
    return data.reduce((acc, item) => {
        if (/^\d+$/.test(item)) {
            acc.numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            acc.alphabets.push(item);
            if (item === item.toLowerCase() && item > acc.highestLowercaseAlphabet) {
                acc.highestLowercaseAlphabet = item;
            }
        }
        return acc;
    }, {
        numbers: [],
        alphabets: [],
        highestLowercaseAlphabet: ""
    });
}

// POST endpoint
app.post('/bfhl', [
    body('data').isArray().withMessage('Data must be an array.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body.data;
    const classifiedData = classifyData(data);

    res.json({
        is_success: true,
        user_id: user.user_id,
        email: user.email,
        roll_number: user.roll_number,
        numbers: classifiedData.numbers,
        alphabets: classifiedData.alphabets,
        highest_lowercase_alphabet: classifiedData.highestLowercaseAlphabet ? [classifiedData.highestLowercaseAlphabet] : []
    });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



