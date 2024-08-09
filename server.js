const express = require('express');
const TextToSpeech = require('text-to-speech-converter');
const path = require('path');

const app = express();

// Serve static files from the root directory
app.use(express.static(__dirname));

// Parse JSON bodies
app.use(express.json());

app.post('/convert', async (req, res) => {
    try {
        const text = req.body.text || 'No text provided';
        const outputFilePath = 'output_voice';
        const result = await TextToSpeech(text, outputFilePath);
        res.json({ success: true, result: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
