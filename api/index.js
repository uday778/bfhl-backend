const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const user = {
    user_id: "21BCE2959",
    email: "somaudaykiran2021@vitstudent.ac.in",
    roll_number: "21BCE2959"
};

function classifyData(data) {
    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = "";

    data.forEach(item => {
        if (/^\d+$/.test(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                if (item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    return {
        numbers: numbers,
        alphabets: alphabets,
        highestLowercaseAlphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };
}

app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    if (!Array.isArray(data)) {
        return res.status(400).json({ error: "Invalid input format, 'data' should be an array." });
    }

    const classifiedData = classifyData(data);

    res.json({
        is_success: true,
        user_id: user.user_id,
        email: user.email,
        roll_number: user.roll_number,
        numbers: classifiedData.numbers,
        alphabets: classifiedData.alphabets,
        highest_lowercase_alphabet: classifiedData.highestLowercaseAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


